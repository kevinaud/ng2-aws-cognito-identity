import { Injectable, Optional } from "@angular/core";

import { AwsCognitoConfig } from "./aws-cognito-config";

@Injectable()
export class AwsService {

  authenticated: boolean = false;

  sdk = require("aws-sdk");
  AWSCognito = require("amazon-cognito-identity-js");
  CognitoUserPool = this.AWSCognito.CognitoUserPool;

  constructor(private config: AwsCognitoConfig) {

    // Your sdk region
    this.sdk.config.region = config.region; //

    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    this.sdk.config.update({ accessKeyId: "anything", secretAccessKey: "anything" });

    let tokenString = JSON.parse(localStorage.getItem("token"));

    if (tokenString  !== null) {

      let token = this.parseJwt(tokenString);
      let currentTime = new Date();

      if (currentTime > token.exp) {

        this.authenticated = true;
        this.setToken(token);

      } else {
        localStorage.removeItem("token");
      }

    }

  }

  cognitoLogin(username, password, cb) {

    let ref = this;

    let userPool = this.makeCognitoUserPoolObject();
    let cognitoUser = this.makeCognitoUserObject(username, userPool);
    let authDetails = this.makeAuthDetailsObject(username, password);

    cognitoUser.authenticateUser(authDetails, {

      onSuccess: ref.onSuccessHandler(cb),
      onFailure: ref.onFailureHandler(cb),
      newPasswordRequired: ref.newPasswordRequiredHandler(cognitoUser, cb)

    });

  }

  onSuccessHandler(cb) {
    let ref = this;
    return function (result) {

      let token = result.getIdToken().getJwtToken();

      localStorage.setItem("token", JSON.stringify(token));
      ref.setToken(token);

      cb(null, "Successfully Logged In");
    }
  }

  onFailureHandler(cb) {
    return function(err) {
        cb(err);
    }
  }

  newPasswordRequiredHandler(cognitoUser, cb) {

    return function(userAttributes, requiredAttributes) {
      // User was signed up by an admin and must provide new  
      // password and required attributes, if any, to complete  
      // authentication. 
      let newPassword = prompt("You must set your password");

      let response;
      let attributesData = { };

      requiredAttributes.forEach(function(attribute) {
        response = prompt("Please supply your " + attribute);
        attributesData[attribute] = response;
      });

      // Get these details and call  
      cognitoUser.completeNewPasswordChallenge(newPassword, attributesData, this);

      cb(null, "Password Updated");
    }
  }

  makeAuthDetailsObject(username, password) {

    let authenticationData = {
      Username : username,
      Password : password,
    };
    
    return new this.AWSCognito.AuthenticationDetails(authenticationData);
  }

  makeCognitoUserPoolObject() {
    
    let poolData = {
      UserPoolId : this.config.userPoolId,
      ClientId : this.config.clientId
    };

    return new this.AWSCognito.CognitoUserPool(poolData);
  }

  makeCognitoUserObject(username, userPool) {

    let userData = {
      Username : username,
      Pool : userPool
    };
 
    return new this.AWSCognito.CognitoUser(userData);
  }

  setToken(token) {

    let loginType = "cognito-idp." + this.config.region + ".amazonaws.com/" + this.config.userPoolId;

    // Here we"ll set our Cognito user pool id. We"ll check to see if a user logged in by getting the token from
    // localStorage which we will implement later
    //
    let loginObject = {};
    loginObject[loginType] = token;

    this.sdk.config.credentials = new this.sdk.CognitoIdentityCredentials({
      // This will be the identity pool from your federated identity pool and not your user pool id.
      IdentityPoolId: this.config.identityPoolId,
      Logins: loginObject
    });

  }

  parseJwt (token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

}
