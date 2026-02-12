import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DataService } from '../services/data.service';
import { AnalyticsData } from '../models/product.model';
import { ProductListComponent } from './product-list.component';
import { OrderTrackingComponent } from './order-tracking.component';
import { AnalyticsComponent } from './analytics.component';

/**
 * Main dashboard component displaying key metrics and navigation
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    ProductListComponent,
    OrderTrackingComponent,
    AnalyticsComponent
  ],
  template: `
    <div class="dashboard-container">
      <header class="header">
        <h1>E-Commerce Admin Dashboard</h1>
        <p>Manage your products, orders, and analytics</p>
      </header>
      
      <!-- Key Metrics Cards -->
      <div class="metrics-grid">
        <mat-card class="metric-card revenue">
          <mat-card-content>
            <div class="metric-icon">
              <mat-icon>attach_money</mat-icon>
            </div>
            <div class="metric-info">
              <h3>Total Revenue</h3>
              <p class="metric-value">\${{ analytics.revenue.toFixed(2) }}</p>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card orders">
          <mat-card-content>
            <div class="metric-icon">
              <mat-icon>shopping_cart</mat-icon>
            </div>
            <div class="metric-info">
              <h3>Total Orders</h3>
              <p class="metric-value">{{ analytics.orders }}</p>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card customers">
          <mat-card-content>
            <div class="metric-icon">
              <mat-icon>people</mat-icon>
            </div>
            <div class="metric-info">
              <h3>Customers</h3>
              <p class="metric-value">{{ analytics.customers }}</p>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card avg-order">
          <mat-card-content>
            <div class="metric-icon">
              <mat-icon>trending_up</mat-icon>
            </div>
            <div class="metric-info">
              <h3>Avg Order Value</h3>
              <p class="metric-value">\${{ analytics.avgOrderValue.toFixed(2) }}</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
      
      <!-- Tabbed Navigation -->
      <mat-tab-group class="content-tabs" animationDuration="300ms">
        <mat-tab label="Products">
          <app-product-list></app-product-list>
        </mat-tab>
        <mat-tab label="Orders">
          <app-order-tracking></app-order-tracking>
        </mat-tab>
        <mat-tab label="Analytics">
          <app-analytics></app-analytics>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .header {
      margin-bottom: 32px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a237e;
      margin-bottom: 8px;
    }
    
    .header p {
      font-size: 1.1rem;
      color: #666;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }
    
    .metric-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .metric-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }
    
    .metric-card mat-card-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
    }
    
    .metric-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .metric-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: white;
    }
    
    .revenue .metric-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .orders .metric-icon { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
    .customers .metric-icon { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
    .avg-order .metric-icon { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
    
    .metric-info h3 {
      font-size: 0.9rem;
      color: #666;
      margin: 0 0 8px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .metric-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;
      margin: 0;
    }
    
    .content-tabs {
      margin-top: 24px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  analytics: AnalyticsData = {
    revenue: 0,
    orders: 0,
    customers: 0,
    avgOrderValue: 0
  };
  
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.analytics = this.dataService.getAnalytics();
  }
}
