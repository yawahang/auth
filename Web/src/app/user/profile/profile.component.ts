import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { UserModel } from '../../core/models/user.model';
import { AlertService } from '../../core/services/alert.service';

@Component({
   selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {

  profile: UserModel | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    // SSR safe
    if (!isPlatformBrowser(this.platformId)) return;

    const email = this.authService.email();

    if (!email) {
      return;
    }

    this.userService.getUserByEmail(email).subscribe({
      next: (data: UserModel[]) => {
        this.profile = data[0] || null;
      },
      error: (error: unknown) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  updateProfile(): void {
    if (!this.profile) return;

    this.userService.updateProfile(this.profile)
      .subscribe({
        next: () => this.alertService.success('Profile updated successfully'),
        error: (error: unknown) => console.error('Update failed', error)
      });
  }
}
