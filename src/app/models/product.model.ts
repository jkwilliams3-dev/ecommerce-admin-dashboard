/**
 * Product model representing inventory items
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  imageUrl?: string;
}

/**
 * Order model representing customer orders
 */
export interface Order {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: Date;
}

/**
 * Analytics data for dashboard metrics
 */
export interface AnalyticsData {
  revenue: number;
  orders: number;
  customers: number;
  avgOrderValue: number;
}

/**
 * Chart data for visualizations
 */
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
  }[];
}
