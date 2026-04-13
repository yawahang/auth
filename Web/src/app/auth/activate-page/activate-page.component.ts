import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-activate-page',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './activate-page.component.html',
  styleUrl: './activate-page.component.css',
})
export class ActivatePageComponent {
  isActive = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

//isActivated=false;
onActivate() {
  const email = this.authService.email();

  if (!email) {
    this.alertService.error('No email found in session storage!');
    return;
  }

  this.userService.activatePage(email).subscribe({
    next: (res: { status: boolean | string }) => {
      this.authService.saveStatus(res);
      this.isActive = String(res.status).toLowerCase() === 'true';
      this.alertService.success('Account Activated!, Redirecting...');

      setTimeout(()=>{
           this.router.navigate(['/dashboard']);
      },2000)

    },
    error: (err: { status?: number }) => {
      console.error('Activation failed', err);

      let message = 'Activation failed!';
      if (err.status === 404) {
        message = 'User not found!';
      }

      this.snackBar.open(message, 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  });
}
}
