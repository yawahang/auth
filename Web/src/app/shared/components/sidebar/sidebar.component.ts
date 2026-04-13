import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isActive = false;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isActive()) {
      this.isActive = true;
    }
  }

  logout(): void {
    this.authService.logout();
  }

}
