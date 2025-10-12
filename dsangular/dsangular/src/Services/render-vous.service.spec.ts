import { TestBed } from '@angular/core/testing';

import { RenderVousService } from './render-vous.service';

describe('RenderVousService', () => {
  let service: RenderVousService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderVousService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
