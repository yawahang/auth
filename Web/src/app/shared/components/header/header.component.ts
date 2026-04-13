import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { UserModel } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  users: UserModel[] = [];
  isMenuOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // ✅ SSR-safe guard
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // ✅ Get email from AuthService (signal)
    const email = this.authService.email();

    if (!email) {
      return;
    }

    this.userService.getUserByEmail(email).subscribe({
      next: (data: UserModel[]) => {
        this.users = data;
      },
      error: (error: unknown) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
  }

  goProfile() {
  this.router.navigate(['/profile']);
  }

  goSettings() {
    this.router.navigate(['/setting']);
  }

  @HostListener('document:click')
  closeMenu() {
    this.isMenuOpen = false;
  }
}
