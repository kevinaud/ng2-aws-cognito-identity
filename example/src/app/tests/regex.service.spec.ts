import { TestBed, async, inject } from '@angular/core/testing';

import { Regex } from '../../../../lib/regex.service';

describe('Service: Regex', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Regex
    });
  });

  it('should ...', inject([ Regex ], (service: Regex) => {
    expect(service).toBeTruthy();
  }));

  it('should match the correct request method', inject([ Regex ], (service: Regex) => {
      console.log(service);
  }));

});
