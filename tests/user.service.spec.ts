/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "../example/node_modules/@angular/core/testing";

import { UserService } from "../lib/user.service";

describe("Service: UserService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService
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

});
