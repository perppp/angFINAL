import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private mockUser = { email: 'test@example.com', password: 'password123', role: 'user' };

  private apiUrl = 'https://your-api-endpoint.com';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    if (credentials.email === this.mockUser.email && credentials.password === this.mockUser.password) {
      return of({ success: true, message: 'Login successful', role: this.mockUser.role });
    } else {
      return of({ success: false, message: 'Invalid credentials' });
    }
  }

  register(user: { email: string; password: string; role: string }): Observable<any> {
    return of({ success: true, message: 'Registration successful' });
  }
}
