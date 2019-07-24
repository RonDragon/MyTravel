import { TestBed } from '@angular/core/testing';

import { RestCountriesService } from './rest-countries.service';

describe('RestCountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestCountriesService = TestBed.get(RestCountriesService);
    expect(service).toBeTruthy();
  });
});
