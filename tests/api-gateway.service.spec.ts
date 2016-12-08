/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from "../example/node_modules/@angular/core/testing";
import { BehaviorSubject } from "rxjs";

import { ApiGatewayService } from "../lib/api-gateway.service";
import { AwsService, ApiClientService } from "../index";

class AwsServiceStub { }

class ApiClientServiceStub {

  $client: BehaviorSubject<any>;
  
  client = {
    podcastGet: function() {}
  }

  constructor() {
     this.$client = new BehaviorSubject<any>(this.client);
  }

  setClient(client) {
    this.$client.next(client);
  }

}

describe("Service: ApiGatewayService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiGatewayService,
        { provide: AwsService, useValue: AwsServiceStub },
        { provide: ApiClientService, useValue: ApiClientServiceStub }
      ]
    });
  });

  it("should ...", inject([ ApiGatewayService ], (service: ApiGatewayService) => {
    expect(service).toBeTruthy();
  }));

  it("should have a client", inject([ ApiGatewayService ], (service: ApiGatewayService) => {
    expect(service.hasOwnProperty("client")).toBeTruthy();
  }));

  it("should have a client", inject([ ApiGatewayService ], (service: ApiGatewayService) => {

    expect(service.endpoints["podcast"]).toBeDefined();

  }));
});
