import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertService } from './core/services/alert.service';
import { AuthService } from './core/services/auth.service';
import { AlertComponent } from './shared/alertc/alert.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly authService = inject(AuthService);
  protected readonly title = signal('authWeb');
  private readonly alertService = inject(AlertService);

  removeAlert(id: string): void {
    this.alertService.removeAlert(id);
  }
}
