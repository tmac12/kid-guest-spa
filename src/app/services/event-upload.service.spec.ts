import { TestBed } from '@angular/core/testing';

import { EventUploadService } from './event-upload.service';

describe('EventUploadService', () => {
  let service: EventUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
