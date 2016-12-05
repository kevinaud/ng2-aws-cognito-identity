/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { AwsService } from '../../../../lib/aws.service';
import { AwsCognitoConfig } from '../../../../lib/aws-cognito-config';

const AwsCognitoConfigStub = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_lBi2qHdsi',
  identityPoolId: 'us-east-1:bfa1fd06-b31e-4b75-b512-3218632ea484',
  clientId: '19gham3mddppq4psig9tnifu8t'
};

describe('Service: AwsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AwsService,
        { provide: AwsCognitoConfig, useValue: AwsCognitoConfigStub }
      ]
    });
  });

  it('should ...', inject([ AwsService ], (service: AwsService) => {
    expect(service).toBeTruthy();
  }));
});
