import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://your-api-endpoint.com'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map((response) => {
        // Assuming the response contains a success message and a role
        if (response.success) {
          return { success: true, message: 'Login successful', role: response.role };
        } else {
          return { success: false, message: response.message || 'Login failed' };
        }
      }),
      catchError((error) => {
        // Handle error and return a failure message
        console.error('Login error:', error);
        return of({ success: false, message: 'An error occurred during login' });
      })
    );
  }

  register(user: { email: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      map((response) => {
        return { success: response.success, message: response.message };
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        return of({ success: false, message: 'An error occurred during registration' });
      })
    );
  }
}
