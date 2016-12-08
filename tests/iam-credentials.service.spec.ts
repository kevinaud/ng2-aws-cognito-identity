/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "../example/node_modules/@angular/core/testing";

import { IAMCredentialsService } from "../lib/iam-credentials.service";
import { LocalStorageService } from "../lib/local-storage.service";

class LocalStorageServiceStub {

  storage = {};

  getItem(key) {
    return this.storage[key];
  }

  setItem(key, value) {
    this.storage[key] = value;
  }

  removeItem(key) {
    delete this.storage[key];
  }

  clear() {
    this.storage = {};
  }

}

describe("Service: IAMCredentialsService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IAMCredentialsService,
        { provide: LocalStorageService, useValue: LocalStorageServiceStub }
      ]
    });
  });

  it("should ...", inject([ IAMCredentialsService, LocalStorageService ], (service: IAMCredentialsService, storage) => {
    expect(service).toBeTruthy();
    console.log(storage);
    console.log(storage.storage);

  }));
});

