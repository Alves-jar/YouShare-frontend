import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, NgIf],
  template: `
    <mat-toolbar color="primary" *ngIf="authService.isLoggedIn()">
      <span>YouShare</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/dashboard">
        <mat-icon>dashboard</mat-icon>
        Dashboard
      </button>
      <button mat-button routerLink="/projects">
        <mat-icon>folder</mat-icon>
        Projects
      </button>
      <button mat-button routerLink="/upload-video">
        <mat-icon>cloud_upload</mat-icon>
        Upload
      </button>
      <button mat-button routerLink="/notifications">
        <mat-icon>notifications</mat-icon>
        Notifications
      </button>
      <button mat-button (click)="logout()">
        <mat-icon>logout</mat-icon>
        Logout
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `],
})
export class Navbar {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
