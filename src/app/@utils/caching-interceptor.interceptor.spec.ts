import { TestBed } from '@angular/core/testing';

import { CachingInterceptorInterceptor } from './caching-interceptor.interceptor';

describe('CachingInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CachingInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CachingInterceptorInterceptor = TestBed.inject(CachingInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
