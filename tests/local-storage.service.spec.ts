/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "../example/node_modules/@angular/core/testing";

import { LocalStorageService } from "../lib/local-storage.service";

describe("Service: LocalStorageService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService
      ]
    });
  });

  it("should ...", inject([ LocalStorageService ], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));
});

