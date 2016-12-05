/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { ApiClientService } from '../../../../lib/api-client.service';
import { AwsService } from '../../../../lib/aws.service';

class AwsServiceStub {
  
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
});
