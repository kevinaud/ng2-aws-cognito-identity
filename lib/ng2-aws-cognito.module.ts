import { NgModule, ModuleWithProviders } from '@angular/core';

import { ApiClientService } from './api-client.service';
import { ApiGatewayService } from './api-gateway.service';
import { AwsService } from './aws.service';
import { AwsCognitoConfig } from './aws-cognito-config';
import { ApigClientFactory } from './apig-client-factory';
import { Regex } from './regex.service';

declare var apigClientFactory: any;

class ApigClientFactory { }

@NgModule({
  providers: [
    ApiClientService,
    ApiGatewayService,
    AwsService,
    AwsCognitoConfig,
    Regex
  ]
})
export class Ng2AwsCognitoModule {
  
  static forRoot(config): ModuleWithProviders {
    return {
      ngModule: Ng2AwsCognitoModule,
      providers: [
        { provide: AwsCognitoConfig, useValue: config },
        { provide: ApigClientFactory }
      ]
    };
  }

}
