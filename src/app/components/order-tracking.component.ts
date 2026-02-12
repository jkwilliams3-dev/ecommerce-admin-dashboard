import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Order } from '../models/product.model';

/**
 * Order tracking component for managing customer orders
 */
@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  template: `
    <div class="order-tracking-container">
      <h2>Order Management</h2>
      
      <div class="table-container">
        <table mat-table [dataSource]="orders" class="order-table">
          
          <!-- Order ID Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>Order ID</th>
            <td mat-cell *matCellDef="let order">
              <strong>{{ order.id }}</strong>
            </td>
          </ng-container>
          
          <!-- Customer Column -->
          <ng-container matColumnDef="customer">
            <th mat-header-cell *matHeaderCellDef>Customer</th>
            <td mat-cell *matCellDef="let order">{{ order.customerName }}</td>
          </ng-container>
          
          <!-- Product Column -->
          <ng-container matColumnDef="product">
            <th mat-header-cell *matHeaderCellDef>Product</th>
            <td mat-cell *matCellDef="let order">
              <div class="product-info">
                {{ order.productName }}
                <span class="quantity">x{{ order.quantity }}</span>
              </div>
            </td>
          </ng-container>
          
          <!-- Total Column -->
          <ng-container matColumnDef="total">
            <th mat-header-cell *matHeaderCellDef>Total</th>
            <td mat-cell *matCellDef="let order">
              <strong>\${{ order.total.toFixed(2) }}</strong>
            </td>
          </ng-container>
          
          <!-- Date Column -->
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let order">{{ order.date | date:'short' }}</td>
          </ng-container>
          
          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let order">
              <mat-form-field subscriptSizing="dynamic">
                <mat-select [(value)]="order.status" (selectionChange)="updateOrderStatus(order)">
                  <mat-option value="pending">Pending</mat-option>
                  <mat-option value="processing">Processing</mat-option>
                  <mat-option value="shipped">Shipped</mat-option>
                  <mat-option value="delivered">Delivered</mat-option>
                </mat-select>
              </mat-form-field>
            </td>
          </ng-container>
          
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .order-tracking-container {
      padding: 24px;
    }
    
    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 20px;
      color: #333;
    }
    
    .table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .order-table {
      width: 100%;
    }
    
    .product-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .quantity {
      font-size: 0.85rem;
      color: #666;
    }
    
    th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #333;
    }
    
    td, th {
      padding: 16px !important;
    }
    
    mat-form-field {
      width: 140px;
    }
  `]
})
export class OrderTrackingComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns: string[] = ['id', 'customer', 'product', 'total', 'date', 'status'];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
  
  updateOrderStatus(order: Order): void {
    this.dataService.updateOrderStatus(order.id, order.status);
  }
}
