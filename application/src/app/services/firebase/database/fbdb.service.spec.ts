import { TestBed, inject } from '@angular/core/testing';

import { FbdbService } from './fbdb.service';

describe('FbdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FbdbService]
    });
  });

  it('should be created', inject([FbdbService], (service: FbdbService) => {
    expect(service).toBeTruthy();
  }));
});
