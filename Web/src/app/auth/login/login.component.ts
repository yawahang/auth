import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';
import { AuthResponse } from '../../core/models/auth-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading= false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  isSignupMode = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*\\d).+$')]],
      confirmPassword: ['', Validators.required]
    }
  ,
{
  validators: this.passwordMatchValidator
});
  }
passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
}
  toggleAuth() {
    this.isSignupMode = !this.isSignupMode;

    // reset the forms
    this.loginForm.reset();
    this.registerForm.reset();
  }

 login() {
    this.loading = true;
  if (this.loginForm.valid) {

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: AuthResponse) => {
        this.loading = false;
        this.authService.saveTokens(res.accessToken, res.refreshToken);
        this.authService.setEmail(res.email);
        this.authService.setUser(res.name);
        this.alertService.success('Logged in successfully');
        if (res.status === true) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/activate-page']);
        }
      },
      error: (err: { status?: number; error?: { message?: string } }) => {
        this.loading = false;
        console.error('Login error:', err);
        let message = 'Something went wrong!';
        if (err.status === 401) {
          message = 'Invalid email or password';
        } else if (err.status === 0) {
          message = 'Cannot connect to server';
        } else if (err.error && err.error.message) {
          message = err.error.message;
        }
        this.alertService.error(message);
      }
    });

  } else {
    this.loading = false;
    this.loginForm.markAllAsTouched();
  }
}


signup(){
    this.loading = true;
    if (this.registerForm.valid)
    {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.loginForm.reset();
          this.registerForm.reset();
          this.loading = false;
          this.snackBar.open('Registration successful', 'Close',{
            duration:3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass:['success-snackbar']
          });
          this.isSignupMode = true;
        },
        error: (error: { error?: { message?: string } }) => {
          this.loading = false;
          this.alertService.error(error.error?.message ?? 'Registration failed');
        },
      });
    } else {
      this.loading = false;
      this.registerForm.markAllAsTouched();
    }
  }

}
