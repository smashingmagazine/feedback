import { TestBed } from '@angular/core/testing';

import { NetlifyFormsService } from './netlify-forms.service';

describe('NetlifyFormsService', () => {
  let service: NetlifyFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetlifyFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
