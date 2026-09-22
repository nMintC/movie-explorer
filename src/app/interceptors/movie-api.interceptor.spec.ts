import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { movieApiInterceptor } from './movie-api.interceptor';
import { HttpClient } from '@angular/common/http';

describe('movieApiInterceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([movieApiInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('should add the shared learning-project header', () => {
    http.get('/movies-api-sample.json').subscribe();

    const request = httpTesting.expectOne('/movies-api-sample.json');

    expect(request.request.headers.get('X-Movie-Explorer-Client')).toBe('angular-learning-project');
    request.flush([]);
  });
});
