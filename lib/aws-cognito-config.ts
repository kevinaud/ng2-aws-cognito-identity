import { Injectable } from "@angular/core";

@Injectable()
export class AwsCognitoConfig {
  region: String;
  identityPoolId: String;
  userPoolId: String;
  clientId: String;
}