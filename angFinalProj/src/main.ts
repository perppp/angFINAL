import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; // Ensure RouterModule is imported
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './app/components/register/register.component';
import { LoginComponent } from './app/components/login/login.component';
import { AdminComponent } from './app/components/admin/admin.component';
import { UserComponent } from './app/components/user/user.component';
import { AuthGuard } from './app/guards/auth.guard';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      RouterModule.forRoot(routes),
      FormsModule
    ),
  ],
}).catch((err) => console.error(err));
