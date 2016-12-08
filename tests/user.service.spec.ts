/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "../example/node_modules/@angular/core/testing";

import { UserService } from "../lib/user.service";
import { AwsService } from "../lib/aws.service";
import { ApiClientService } from "../lib/api-client.service";

const AwsServiceStub = {
  cognitoLogin(username, password, cb){
    if(username === "correctUsername" && password === "correctPassword") {
      return cb (null, "successfully logged in");
    } else {
      return cb ("not logged in");
    }
  }
}

class ApiClientServiceStub { }

describe("Service: UserService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AwsService, useValue: AwsServiceStub },
        { provide: ApiClientService, useValue: ApiClientServiceStub }
      ]
    });
  });

  it("should ...", inject([ UserService ], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it("should have a $auth attribute that can be subscribed to", inject([ UserService ], (service: UserService) => {

    expect(service.$auth.constructor.name).toEqual("BehaviorSubject");

  }));

  it("auth status should be initialized to false", inject([ UserService ], (service: UserService) => {

    service.$auth.subscribe((auth) => {
      expect(auth).toEqual(false);
    });

  }));

  it("should return a success response if the username and password are correct", inject([ UserService ], (service: UserService) => {

    service.login("correctUsername", "correctPassword").subscribe(
      (success) => {
        expect(success).toBeTruthy();
      },
      (error) => {
        expect(error).toBeFalsy();
      }
    );

  }));

  it("should return an error response if the username and password are incorrect", inject([ UserService ], (service: UserService) => {

    service.login("incorrectUsername", "incorrectPassword").subscribe(
      (success) => {
        expect(success).toBeFalsy();
      },
      (error) => {
        expect(error).toBeTruthy();
      }
    );

  }));

});
