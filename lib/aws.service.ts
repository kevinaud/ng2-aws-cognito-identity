import { Injectable, Optional } from '@angular/core';

import { AwsCognitoConfig } from './aws-cognito-config';

@Injectable()
export class AwsService {

  authenticated: boolean = false;

  sdk = require('aws-sdk');
  AWSCognito = require('amazon-cognito-identity-js');
  CognitoUserPool = this.AWSCognito.CognitoUserPool;

  constructor(private config: AwsCognitoConfig) {

    // Your sdk region
    this.sdk.config.region = config.region; //

    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    this.sdk.config.update({ accessKeyId: 'anything', secretAccessKey: 'anything' });

    let tokenString = JSON.parse(localStorage.getItem('token'));

    if(tokenString  !== null) {

      let token = this.parseJwt(tokenString);
      let currentTime = new Date();

      if (currentTime > token.exp) {

        this.authenticated = true;
        let loginType = 'cognito-idp.us-east-1.amazonaws.com/' + config.userPoolId;

        // Here we'll set our Cognito user pool id. We'll check to see if a user logged in by getting the token from
        // localStorage which we will implement later
        let loginObject = {};
        loginObject[loginType] = JSON.parse(localStorage.getItem('token'));

        this.sdk.config.credentials = new this.sdk.CognitoIdentityCredentials({
          // This will be the identity pool from your federated identity pool and not your user pool id.
          IdentityPoolId: config.identityPoolId,
          Logins: loginObject
        });

      } else {
        localStorage.removeItem('token');
      }

    }

  }

  cognitoLogin(username, password, cb){

    var sdk = this.sdk;
    var config = this.config;

    var authenticationData = {
      Username : username,
      Password : password,
    };
    var authenticationDetails = new this.AWSCognito.AuthenticationDetails(authenticationData);
    
    var poolData = {
      UserPoolId : this.config.userPoolId,
      ClientId : this.config.clientId
    };
    
    var userPool = new this.AWSCognito.CognitoUserPool(poolData);

    var userData = {
      Username : username,
      Pool : userPool
    };

    var cognitoUser = new this.AWSCognito.CognitoUser(userData);
    
    cognitoUser.authenticateUser(authenticationDetails, {

      onSuccess: function (result) {
        console.log('id token - ' + result.getIdToken().getJwtToken());
        localStorage.setItem('token', JSON.stringify(result.getIdToken().getJwtToken()));
        let token = result.getIdToken().getJwtToken();

        /*sdk.config.credentials = new sdk.CognitoIdentityCredentials({
          // This will be the identity pool from your federated identity pool and not your user pool id.
          IdentityPoolId: 'us-east-1:bfa1fd06-b31e-4b75-b512-3218632ea484',
          Logins: {
            // Here we'll set our Cognito user pool id. We'll check to see if a user logged in by getting the token from
            // localStorage which we will implement later
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_lBi2qHdsi': result.getIdToken().getJwtToken()
          }
        });*/

        console.log('config var', config);

        let loginType = 'cognito-idp.' + config.region + '.amazonaws.com/' + config.userPoolId;

        // Here we'll set our Cognito user pool id. We'll check to see if a user logged in by getting the token from
        // localStorage which we will implement later
        let loginObject = {};
        loginObject[loginType] = result.getIdToken().getJwtToken();

        sdk.config.credentials = new sdk.CognitoIdentityCredentials({
          // This will be the identity pool from your federated identity pool and not your user pool id.
          IdentityPoolId: config.identityPoolId,
          Logins: loginObject
        });

        cb(null, 'Successfully Logged In');

      },
 
      onFailure: function(err) {
        cb(err);
      },

      newPasswordRequired: function(userAttributes, requiredAttributes) {
        // User was signed up by an admin and must provide new  
        // password and required attributes, if any, to complete  
        // authentication. 
        var newPassword = prompt("You must set your password");

        var response;
        let attributesData = { };

        requiredAttributes.forEach(function(attribute) {
          response = prompt("Please supply your " + attribute);
          attributesData[attribute] = response;
        })
        
        // Get these details and call  
        cognitoUser.completeNewPasswordChallenge(newPassword, attributesData, this);

        cb(null, 'Password Updated');
      }

    });

  }

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

}
