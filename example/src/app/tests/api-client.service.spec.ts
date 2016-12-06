/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { ApiClientService } from '../../../../lib/api-client.service';
import { AwsService } from '../../../../lib/aws.service';

class AwsServiceStub {
  
}

const apigClientFactory = {
  newClient: function(credentials) {
    
    if(credentials) {
      return {
        auth: true
      }
    } else {
      return {
        auth: false
      }
    }
    
  }
}

describe('Service: ApiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiClientService,
        { provide: AwsService, useValue: AwsServiceStub }
      ]
    });
  });

  it('should ...', inject([ ApiClientService ], (service: ApiClientService) => {
    expect(service).toBeTruthy();
  }));

  it('should initialize itself with a client', inject([ ApiClientService ], (service: ApiClientService) => {
    expect(service.client).toBeTruthy();
  }));

});
