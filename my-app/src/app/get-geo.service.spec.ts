import { TestBed, inject } from '@angular/core/testing';

import { GetGeoService } from './get-geo.service';

describe('GetGeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetGeoService]
    });
  });

  it('should be created', inject([GetGeoService], (service: GetGeoService) => {
    expect(service).toBeTruthy();
  }));
});
