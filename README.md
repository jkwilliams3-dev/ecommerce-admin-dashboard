# E-Commerce Admin Dashboard

A professional, feature-rich admin dashboard for e-commerce businesses built with Angular 17, TypeScript, and Angular Material. Manage products, track orders, and analyze sales performance with interactive charts.

![Angular](https://img.shields.io/badge/Angular-17-red) ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue) ![Material](https://img.shields.io/badge/Angular_Material-17-purple) ![Chart.js](https://img.shields.io/badge/Chart.js-4.4-orange)

## 🚀 Features

### Product Management
- **Inventory Overview** - View all products with categories, pricing, and stock levels
- **Live Stock Updates** - Edit stock quantities directly in the table
- **Status Indicators** - Color-coded chips for in-stock, low-stock, and out-of-stock items
- **Real-time Updates** - Changes persist in the mock data service

### Order Tracking
- **Order List** - Complete view of all customer orders
- **Status Management** - Update order status (Pending → Processing → Shipped → Delivered)
- **Customer Details** - Track customer names, products ordered, and quantities
- **Order Totals** - Clear display of order values and dates

### Analytics Dashboard
- **Revenue by Category** - Bar chart showing sales performance per category
- **Order Status Distribution** - Doughnut chart visualizing order pipeline
- **Stock Levels** - Color-coded bar chart highlighting inventory health
- **Daily Orders Trend** - Line chart showing order volume over time

### Key Metrics Cards
- **Total Revenue** - Aggregate sales figures
- **Total Orders** - Order count with real-time updates
- **Active Customers** - Unique customer tracking
- **Average Order Value** - Calculated automatically

## 🛠️ Tech Stack

- **Angular 17.3** - Latest standalone components architecture
- **TypeScript 5.4** - Strict type safety
- **Angular Material 17** - Professional UI components and theming
- **Chart.js 4.4** - Interactive, responsive charts
- **RxJS 7.8** - Reactive data streams
- **SCSS** - Enhanced styling capabilities

## 📦 Installation

1. **Clone or download** this project
2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Application

### Development Server
```bash
npm start
```
Opens at `http://localhost:4200` with live reload.

### Production Build
```bash
npm run build
```
Creates optimized build in `dist/ecommerce-admin-dashboard/`.

### Development Build (Watch Mode)
```bash
npm run watch
```
Continuous compilation for active development.

## 📂 Project Structure

```
ecommerce-admin-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard.component.ts        # Main dashboard with metrics
│   │   │   ├── product-list.component.ts     # Product inventory table
│   │   │   ├── order-tracking.component.ts   # Order management
│   │   │   └── analytics.component.ts        # Charts & visualizations
│   │   ├── services/
│   │   │   └── data.service.ts               # Mock data service (in-memory)
│   │   ├── models/
│   │   │   └── product.model.ts              # TypeScript interfaces
│   │   └── app.component.ts                  # Root component
│   ├── index.html
│   ├── main.ts                               # Bootstrap file
│   └── styles.scss                           # Global styles
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Key Components

### DashboardComponent
Main container with metric cards and tabbed navigation for switching between products, orders, and analytics.

### ProductListComponent
Material table with editable stock fields, status chips, and automatic status updates based on inventory levels.

### OrderTrackingComponent
Comprehensive order list with dropdown selectors for status updates, showing customer details and order history.

### AnalyticsComponent
Four interactive Chart.js visualizations:
1. Revenue by category (bar chart)
2. Order status distribution (doughnut chart)
3. Stock levels (color-coded bar chart)
4. Daily orders trend (line chart)

### DataService
RxJS-based service providing:
- Observable streams for products and orders
- Mock data initialization
- CRUD operations for products and orders
- Real-time analytics calculations

## 💾 Data Management

Uses an **in-memory data service** with RxJS observables:
- No backend required - perfect for demos and prototypes
- Easy to swap with real HTTP calls to an API
- Reactive architecture ready for real-time updates
- Observable streams for component subscriptions

## 🌐 Deployment

Ready to deploy to:
- **Vercel**: `vercel --prod`
- **Netlify**: Build command: `npm run build`, Publish directory: `dist/ecommerce-admin-dashboard/browser`
- **Firebase Hosting**: `firebase deploy`
- **AWS S3 + CloudFront**: Upload `dist/` contents

## 🎯 Why I Built This

This project demonstrates my expertise in:
- **Angular 17 standalone architecture** - Modern, streamlined approach
- **Reactive programming with RxJS** - Observable streams and state management
- **Material Design implementation** - Professional, accessible UI components
- **Data visualization** - Chart.js integration for business intelligence
- **TypeScript best practices** - Strong typing, interfaces, and clean architecture
- **Component composition** - Modular, reusable, testable code

Perfect for showcasing enterprise-level Angular skills in portfolios, job applications, and client presentations.

## 📝 Future Enhancements

- Add authentication/authorization
- Connect to real REST API or GraphQL backend
- Implement pagination for large datasets
- Add filtering and search functionality
- Export data to CSV/Excel
- Real-time notifications for low stock
- User management module

## 📄 License

MIT License - free to use for personal and commercial projects.

---

**Built with ❤️ by Chree** - Demonstrating production-quality Angular development
