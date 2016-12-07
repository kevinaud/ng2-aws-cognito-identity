import { TestBed, async, inject } from '@angular/core/testing';

import { Regex } from '../../../../lib/regex.service';

describe('Service: Regex', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Regex
      ]
    });
  });

  it('should ...', inject([ Regex ], (service: Regex) => {
    expect(service).toBeTruthy();
  }));

  it('should match the correct request method', inject([ Regex ], (service: Regex) => {
      expect(service.requestMethod("helloPost")).toEqual("Post");
      expect(service.requestMethod("helloPut")).toEqual("Put");
      expect(service.requestMethod("helloOptions")).toEqual("Options");
      expect(service.requestMethod("helloGet")).toEqual("Get");
      expect(service.requestMethod("helloHead")).toEqual("Head");
      expect(service.requestMethod("helloDelete")).toEqual("Delete");
      expect(service.requestMethod("helloPatch")).toEqual("Patch");
      expect(service.requestMethod("helloWorldPost")).toEqual("Post");
      expect(service.requestMethod("helloWorldPut")).toEqual("Put");
      expect(service.requestMethod("helloWorldOptions")).toEqual("Options");
      expect(service.requestMethod("helloWorldGet")).toEqual("Get");
      expect(service.requestMethod("helloWorldHead")).toEqual("Head");
      expect(service.requestMethod("helloWorldDelete")).toEqual("Delete");
      expect(service.requestMethod("helloWorldPatch")).toEqual("Patch");
      expect(service.requestMethod("helloWorld")).toBeFalsy();
      expect(service.requestMethod("helloPostWorld")).toBeFalsy();
      expect(service.requestMethod("helloWorldPostPutHello")).toBeFalsy();
      expect(service.requestMethod("helloWorldPostPut")).toEqual("Put");
  }));

  it("should match only the first path element", inject([ Regex ], (service: Regex) => {
      expect(service.firstPathElement("helloPostPut")).toEqual("hello");
      expect(service.firstPathElement("HelloPostPut")).toBeFalsy();
      expect(service.firstPathElement("HelloPostPutndsuocndsue")).toBeFalsy();
      expect(service.firstPathElement("worldHelloPostPut")).toEqual("world");
      expect(service.firstPathElement("HelloPostPut")).toBeFalsy();
  }));

});
