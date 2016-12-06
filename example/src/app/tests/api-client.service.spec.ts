/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { ApiClientService } from '../../../../lib/api-client.service';
import { ApigClientFactory } from '../../../../lib/apig-client-factory';
import { AwsService } from '../../../../lib/aws.service';

class AwsServiceStub {
  
}

const unauthenticatedClient = {
  auth: false
}

const authenticatedClient = {
  auth: true
}

const apigClientFactoryStub = {
  newClient: function(credentials) {
    
    if(credentials) {
      return authenticatedClient;
    } else {
      return unauthenticatedClient;
    }

  }
}

describe('Service: ApiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiClientService,
        { provide: AwsService, useValue: AwsServiceStub },
        { provide: ApigClientFactory, useValue: apigClientFactoryStub}
      ]
    });
  });

  it('should ...', inject([ ApiClientService ], (service: ApiClientService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the injected apigClientFactory', inject([ ApiClientService ], (service: ApiClientService) => {

    service.$client.subscribe((client) => {
      expect(client).toEqual(unauthenticatedClient);
    });
  
  }));

  it('should get the injected apigClientFactory', inject([ ApiClientService ], (service: ApiClientService) => {

    service.$client.subscribe((client) => {
      expect(client).toEqual(unauthenticatedClient);
    });
  
  }));

});
