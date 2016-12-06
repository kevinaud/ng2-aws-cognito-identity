import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApigClientFactory } from './apig-client-factory';

@Injectable()
export class ApiClientService {

  $client: BehaviorSubject<any>;

  constructor(private factory: ApigClientFactory) {

    
    this.$client = new BehaviorSubject(this.factory.newClient());

    /*user.authStatus.subscribe((authenticated) => {
      if(authenticated) {
        var ref = this;
        aws.AWS.config.credentials.get(function (err) {

          if(err) {
            console.log(err);
            return;
          }

          // We'll create an instance of our API Gateway client again
          // This time we'll pass in the required keys that will authenticate the request
          // The API Gateway SDK will take care of transforming these keys into the appropriate
          // header and will send out the request to our endpoint.
          let authClient = ref.factory.newClient({
            accessKey: aws.AWS.config.credentials.accessKeyId,
            secretKey: aws.AWS.config.credentials.secretAccessKey,
            sessionToken: aws.AWS.config.credentials.sessionToken,
            region: 'us-east-1'
          });
          
          ref.$factory.next(authClient);

        });
      }
    });*/
    
  }

}
