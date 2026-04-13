import { Component, inject, OnInit } from '@angular/core';
import { AlertService } from '../../core/services/alert.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alertc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  private readonly alertService = inject(AlertService);
  alerts = this.alertService.alerts;

  removeAlert(id: string): void {
    this.alertService.removeAlert(id);
  }
}
