import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, Order, AnalyticsData } from '../models/product.model';

/**
 * Mock data service providing in-memory data for the dashboard
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  // Mock products data
  private productsSubject = new BehaviorSubject<Product[]>([
    {
      id: '1',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 129.99,
      stock: 45,
      status: 'in-stock',
      imageUrl: 'https://via.placeholder.com/100'
    },
    {
      id: '2',
      name: 'Smart Watch',
      category: 'Electronics',
      price: 299.99,
      stock: 8,
      status: 'low-stock',
      imageUrl: 'https://via.placeholder.com/100'
    },
    {
      id: '3',
      name: 'Running Shoes',
      category: 'Sports',
      price: 89.99,
      stock: 120,
      status: 'in-stock',
      imageUrl: 'https://via.placeholder.com/100'
    },
    {
      id: '4',
      name: 'Coffee Maker',
      category: 'Home',
      price: 79.99,
      stock: 0,
      status: 'out-of-stock',
      imageUrl: 'https://via.placeholder.com/100'
    },
    {
      id: '5',
      name: 'Yoga Mat',
      category: 'Sports',
      price: 24.99,
      stock: 200,
      status: 'in-stock',
      imageUrl: 'https://via.placeholder.com/100'
    },
    {
      id: '6',
      name: 'Laptop Stand',
      category: 'Electronics',
      price: 49.99,
      stock: 5,
      status: 'low-stock',
      imageUrl: 'https://via.placeholder.com/100'
    }
  ]);
  
  // Mock orders data
  private ordersSubject = new BehaviorSubject<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'John Smith',
      productName: 'Wireless Headphones',
      quantity: 2,
      total: 259.98,
      status: 'delivered',
      date: new Date('2024-02-08')
    },
    {
      id: 'ORD-002',
      customerName: 'Sarah Johnson',
      productName: 'Smart Watch',
      quantity: 1,
      total: 299.99,
      status: 'shipped',
      date: new Date('2024-02-09')
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Davis',
      productName: 'Running Shoes',
      quantity: 1,
      total: 89.99,
      status: 'processing',
      date: new Date('2024-02-10')
    },
    {
      id: 'ORD-004',
      customerName: 'Emily Brown',
      productName: 'Yoga Mat',
      quantity: 3,
      total: 74.97,
      status: 'pending',
      date: new Date('2024-02-11')
    },
    {
      id: 'ORD-005',
      customerName: 'David Wilson',
      productName: 'Laptop Stand',
      quantity: 1,
      total: 49.99,
      status: 'processing',
      date: new Date('2024-02-11')
    }
  ]);
  
  constructor() {}
  
  /**
   * Get all products
   */
  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }
  
  /**
   * Get all orders
   */
  getOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }
  
  /**
   * Get analytics data
   */
  getAnalytics(): AnalyticsData {
    const orders = this.ordersSubject.value;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    
    return {
      revenue: totalRevenue,
      orders: totalOrders,
      customers: new Set(orders.map(o => o.customerName)).size,
      avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
    };
  }
  
  /**
   * Update product stock
   */
  updateProductStock(productId: string, newStock: number): void {
    const products = this.productsSubject.value.map(product => {
      if (product.id === productId) {
        let status: 'in-stock' | 'low-stock' | 'out-of-stock' = 'in-stock';
        if (newStock === 0) status = 'out-of-stock';
        else if (newStock < 10) status = 'low-stock';
        
        return { ...product, stock: newStock, status };
      }
      return product;
    });
    
    this.productsSubject.next(products);
  }
  
  /**
   * Update order status
   */
  updateOrderStatus(orderId: string, newStatus: Order['status']): void {
    const orders = this.ordersSubject.value.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    this.ordersSubject.next(orders);
  }
}
