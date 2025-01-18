import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to the Task Management App!</h1>
    <router-outlet></router-outlet> <!-- Use router-outlet for routing -->
  `,
})
export class AppComponent {}
