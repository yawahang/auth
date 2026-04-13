// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';

// interface StatCard {
//   title: string;
//   value: number | string;
//   icon: string;
//   colorClass: string;
// }
// @Component({
//   selector: 'app-dashboard',
//   imports: [CommonModule, RouterModule],
//   templateUrl: './dashboard.html',
//   styleUrl: './dashboard.css',
// })
// export class Dashboard implements OnInit
//  {
//   stats: StatCard[] = [];
//   recentActivities: string[] = [];

//   ngOnInit(): void {
//     // Dummy statistics
//     this.stats = [
//       { title: 'Total Users', value: 1200, icon: 'bi-people', colorClass: 'bg-primary' },
//       { title: 'Total Sales', value: '$8,450', icon: 'bi-currency-dollar', colorClass: 'bg-success' },
//       { title: 'Total Orders', value: 320, icon: 'bi-cart', colorClass: 'bg-warning' },
//       { title: 'Feedback', value: 85, icon: 'bi-chat-dots', colorClass: 'bg-info' }
//     ];

//     // Dummy recent activities
//     this.recentActivities = [
//       'User John Doe signed up',
//       'Order #1023 placed',
//       'Payment of $250 received',
//       'Product "Laptop" added to inventory'
//     ];
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

interface StatCard {
  title: string;
  value: number | string;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  // ✅ Signals instead of plain arrays
  stats = signal<StatCard[]>([]);
  recentActivities = signal<string[]>([]);

  ngOnInit(): void {
    this.stats.set([
      { title: 'Total Users', value: 1200, icon: 'bi-people', colorClass: 'bg-primary' },
      { title: 'Total Sales', value: '$8,450', icon: 'bi-currency-dollar', colorClass: 'bg-success' },
      { title: 'Total Orders', value: 320, icon: 'bi-cart', colorClass: 'bg-warning' },
      { title: 'Feedback', value: 85, icon: 'bi-chat-dots', colorClass: 'bg-info' }
    ]);

    this.recentActivities.set([
      'User John Doe signed up',
      'Order #1023 placed',
      'Payment of $250 received',
      'Product "Laptop" added to inventory'
    ]);
  }
}
