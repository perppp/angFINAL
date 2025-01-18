import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule to use ngModel
import { LoginComponent } from './app/components/login/login.component';
import { AdminComponent } from './app/components/admin/admin.component';
import { UserComponent } from './app/components/user/user.component';
import { AuthGuard } from './app/guards/auth.guard';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
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
