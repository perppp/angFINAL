import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
          // If the login is successful, navigate to the appropriate page based on the role
          const targetRoute = result.role === 'admin' ? '/admin' : '/user';
          this.router.navigate([targetRoute]); // Redirect user to respective page
        } else {
          // Show error message if login fails
          this.errorMessage = result.message;
        }
      },
      error: (err) => {
        // Handle error during login attempt
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
