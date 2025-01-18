import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user = { email: '', password: '', role: 'user' };
  message = '';

  constructor(private authService: AuthService) {}

  register() {
    // Subscribe to the observable returned by the authService.register() method
    this.authService.register(this.user).subscribe({
      next: (result) => {
        // Handle the result of the registration
        this.message = result.success
          ? 'Registration successful!'
          : result.message;
      },
      error: (err) => {
        // Handle any error during registration
        this.message = 'An error occurred during registration. Please try again.';
        console.error('Registration error:', err);
      },
    });
  }
}
