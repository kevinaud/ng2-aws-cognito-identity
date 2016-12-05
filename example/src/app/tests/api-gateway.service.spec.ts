/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { ApiGatewayService } from '../../../../lib/api-gateway.service';
import { AwsService, ApiClientService } from '../../../../index';

class AwsServiceStub { }

class ApiClientServiceStub { }

describe('Service: ApiGatewayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiGatewayService,
        { provide: AwsService, useValue: AwsServiceStub },
        { provide: ApiClientService, useValue: ApiClientServiceStub }
      ]
    });
  });

  it('should ...', inject([ ApiGatewayService ], (service: ApiGatewayService) => {
    expect(service).toBeTruthy();
  }));
});
