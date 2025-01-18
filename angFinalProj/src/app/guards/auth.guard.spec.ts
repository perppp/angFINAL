import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

// Mock router for testing
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: Router, useClass: MockRouter } // Mocking Router to avoid actual navigation
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if token exists', () => {
    localStorage.setItem('token', 'mock-token'); // Mocking the token in localStorage
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should prevent access if token does not exist', () => {
    localStorage.removeItem('token'); // Ensuring token is absent
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Checking if navigation happened
  });
});
