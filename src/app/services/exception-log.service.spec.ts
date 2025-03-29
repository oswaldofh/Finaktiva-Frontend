import { TestBed } from '@angular/core/testing';

import { ExceptionLogService } from './exception-log.service';

describe('ExceptionLogService', () => {
  let service: ExceptionLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExceptionLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
