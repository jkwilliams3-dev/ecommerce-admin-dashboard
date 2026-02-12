import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { DataService } from '../services/data.service';
import { Product, Order } from '../models/product.model';

Chart.register(...registerables);

/**
 * Analytics component with charts and visualizations
 */
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics-container">
      <h2>Analytics Dashboard</h2>
      
      <div class="charts-grid">
        <div class="chart-card">
          <h3>Revenue by Category</h3>
          <canvas #revenueChart></canvas>
        </div>
        
        <div class="chart-card">
          <h3>Order Status Distribution</h3>
          <canvas #orderStatusChart></canvas>
        </div>
        
        <div class="chart-card">
          <h3>Stock Levels by Product</h3>
          <canvas #stockChart></canvas>
        </div>
        
        <div class="chart-card">
          <h3>Daily Orders Trend</h3>
          <canvas #ordersChart></canvas>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-container {
      padding: 24px;
    }
    
    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 24px;
      color: #333;
    }
    
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }
    
    .chart-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .chart-card h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 16px;
      color: #555;
    }
    
    canvas {
      max-height: 300px;
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  @ViewChild('revenueChart') revenueChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('orderStatusChart') orderStatusChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('stockChart') stockChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ordersChart') ordersChartRef!: ElementRef<HTMLCanvasElement>;
  
  products: Product[] = [];
  orders: Order[] = [];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getProducts().subscribe(products => {
      this.products = products;
      this.createCharts();
    });
    
    this.dataService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.createCharts();
    });
  }
  
  ngAfterViewInit(): void {
    // Charts will be created in ngOnInit once data is loaded
  }
  
  private createCharts(): void {
    if (!this.products.length || !this.orders.length) return;
    
    // Revenue by Category Chart
    this.createRevenueChart();
    
    // Order Status Chart
    this.createOrderStatusChart();
    
    // Stock Levels Chart
    this.createStockChart();
    
    // Orders Trend Chart
    this.createOrdersTrendChart();
  }
  
  private createRevenueChart(): void {
    const categoryRevenue = new Map<string, number>();
    
    this.orders.forEach(order => {
      const product = this.products.find(p => p.name === order.productName);
      if (product) {
        const current = categoryRevenue.get(product.category) || 0;
        categoryRevenue.set(product.category, current + order.total);
      }
    });
    
    const ctx = this.revenueChartRef.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Array.from(categoryRevenue.keys()),
          datasets: [{
            label: 'Revenue ($)',
            data: Array.from(categoryRevenue.values()),
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
  
  private createOrderStatusChart(): void {
    const statusCounts = new Map<string, number>();
    
    this.orders.forEach(order => {
      const current = statusCounts.get(order.status) || 0;
      statusCounts.set(order.status, current + 1);
    });
    
    const ctx = this.orderStatusChartRef.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Array.from(statusCounts.keys()).map(s => s.charAt(0).toUpperCase() + s.slice(1)),
          datasets: [{
            data: Array.from(statusCounts.values()),
            backgroundColor: [
              'rgba(255, 206, 86, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
  }
  
  private createStockChart(): void {
    const ctx = this.stockChartRef.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.products.map(p => p.name),
          datasets: [{
            label: 'Stock Level',
            data: this.products.map(p => p.stock),
            backgroundColor: this.products.map(p => 
              p.status === 'out-of-stock' ? 'rgba(255, 99, 132, 0.6)' :
              p.status === 'low-stock' ? 'rgba(255, 206, 86, 0.6)' :
              'rgba(75, 192, 192, 0.6)'
            ),
            borderColor: this.products.map(p => 
              p.status === 'out-of-stock' ? 'rgba(255, 99, 132, 1)' :
              p.status === 'low-stock' ? 'rgba(255, 206, 86, 1)' :
              'rgba(75, 192, 192, 1)'
            ),
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
  
  private createOrdersTrendChart(): void {
    const ordersByDate = new Map<string, number>();
    
    this.orders.forEach(order => {
      const dateStr = order.date.toLocaleDateString();
      const current = ordersByDate.get(dateStr) || 0;
      ordersByDate.set(dateStr, current + 1);
    });
    
    const ctx = this.ordersChartRef.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from(ordersByDate.keys()),
          datasets: [{
            label: 'Orders',
            data: Array.from(ordersByDate.values()),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            fill: true,
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }
  }
}
