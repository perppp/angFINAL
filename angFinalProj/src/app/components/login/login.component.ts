import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (result) => {
        if (result.success) {
          // Navigate based on the role
          const targetRoute = result.role === 'admin' ? '/admin' : '/user';
          this.router.navigate([targetRoute]);
        } else {
          // If login is unsuccessful, show the error message
          this.errorMessage = result.message;
        }
      },
      error: (err) => {
        // Handle error in case of a failed HTTP request
        if (err.status === 0) {
          this.errorMessage = 'Network error. Please try again later.';
        } else {
          this.errorMessage = err.message;
        }
        console.error('Login error:', err);
      },
    });
  }
}
