import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Correct import paths for components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';  // Import RegisterComponent

// Define routes
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Correct pathMatch value
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Import RouterModule for routing
  template: `
    <h1>Welcome to the App!</h1>
    <router-outlet></router-outlet> <!-- Routed components will be displayed here -->
  `,
})
export class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes), // Add the routes here
      HttpClientModule, // For HTTP requests
      FormsModule // For forms handling
    ),
  ],
}).catch((err) => console.error(err));
