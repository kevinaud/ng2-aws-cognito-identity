import { NgModule, ModuleWithProviders } from "@angular/core";

import { ApiClientService } from "./api-client.service";
import { ApiGatewayService } from "./api-gateway.service";
import { AwsService } from "./aws.service";
import { AwsCognitoConfig } from "./aws-cognito-config";
import { ApigClientFactory } from "./apig-client-factory";
import { UserService } from './user.service';
import { LocalStorageService } from './local-storage.service';

declare var apigClientFactory: any;

@NgModule({
  providers: [
    ApiClientService,
    ApiGatewayService,
    AwsService,
    AwsCognitoConfig
  ]
})
export class Ng2AwsCognitoModule {

  static forRoot(config): ModuleWithProviders {
    return {
      ngModule: Ng2AwsCognitoModule,
      providers: [
        UserService,
		LocalStorageService,
        { provide: AwsCognitoConfig, useValue: config },
        { provide: ApigClientFactory, useValue: apigClientFactory }
      ]
    };
  }

}

