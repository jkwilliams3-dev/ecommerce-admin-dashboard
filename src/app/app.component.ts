import { Component } from '@angular/core';
import { DashboardComponent } from './components/dashboard.component';

/**
 * Root application component
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  template: `
    <app-dashboard></app-dashboard>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
  `]
})
export class AppComponent {
  title = 'E-Commerce Admin Dashboard';
}
