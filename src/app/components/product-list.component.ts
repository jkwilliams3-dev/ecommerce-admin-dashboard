import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../services/data.service';
import { Product } from '../models/product.model';

/**
 * Product list component with inventory management
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="product-list-container">
      <h2>Product Inventory</h2>
      
      <div class="table-container">
        <table mat-table [dataSource]="products" class="product-table">
          
          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Product</th>
            <td mat-cell *matCellDef="let product">
              <div class="product-cell">
                <strong>{{ product.name }}</strong>
                <span class="category">{{ product.category }}</span>
              </div>
            </td>
          </ng-container>
          
          <!-- Price Column -->
          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef>Price</th>
            <td mat-cell *matCellDef="let product">\${{ product.price.toFixed(2) }}</td>
          </ng-container>
          
          <!-- Stock Column -->
          <ng-container matColumnDef="stock">
            <th mat-header-cell *matHeaderCellDef>Stock</th>
            <td mat-cell *matCellDef="let product">
              <mat-form-field class="stock-input" subscriptSizing="dynamic">
                <input matInput type="number" [(ngModel)]="product.stock" 
                       (blur)="updateStock(product)" min="0">
              </mat-form-field>
            </td>
          </ng-container>
          
          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let product">
              <mat-chip-set>
                <mat-chip [ngClass]="'status-' + product.status">
                  {{ product.status | titlecase }}
                </mat-chip>
              </mat-chip-set>
            </td>
          </ng-container>
          
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .product-list-container {
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
    
    .product-table {
      width: 100%;
    }
    
    .product-cell {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .category {
      font-size: 0.85rem;
      color: #666;
    }
    
    .stock-input {
      width: 80px;
      margin-top: 8px;
    }
    
    .status-in-stock {
      background-color: #4caf50 !important;
      color: white !important;
    }
    
    .status-low-stock {
      background-color: #ff9800 !important;
      color: white !important;
    }
    
    .status-out-of-stock {
      background-color: #f44336 !important;
      color: white !important;
    }
    
    th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #333;
    }
    
    td, th {
      padding: 16px !important;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'stock', 'status'];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  
  updateStock(product: Product): void {
    this.dataService.updateProductStock(product.id, product.stock);
  }
}
