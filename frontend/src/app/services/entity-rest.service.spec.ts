import { TestBed } from '@angular/core/testing';

import { EntityRestService } from './entity-rest.service';

describe('EntityRestService', () => {
  let service: EntityRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
