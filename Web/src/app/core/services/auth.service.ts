import { HttpClient } from '@angular/common/http';
import { computed, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse } from '../models/auth-response.model';

const STORAGE_KEY = {
  userName: "userName",
  email: "email",
  accessToken: "accessToken",
  refreshToken: "refreshToken"
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadFromStorage();
  }

  // ---- Signals
  private _accessToken = signal<string | null>(null);
  private _refreshToken = signal<string | null>(null);
  private _userName = signal<string | null>(null);
  private _email = signal<string | null>(null);
  private _userId = signal<number | null>(null);

  // ---- Computed
  readonly authenticated = computed(() => !!this._accessToken());
  readonly userName = computed(() => this._userName());
  readonly email = computed(() => this._email());
  readonly userid = computed(() => this._userId());

  // ---- Utility (SAFE STORAGE ACCESS)
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getItem(key: string): string | null {
    return this.isBrowser() ? sessionStorage.getItem(key) : null;
  }

  private setItem(key: string, value: string) {
    if (this.isBrowser()) {
      sessionStorage.setItem(key, value);
    }
  }

  private removeItem(key: string) {
    if (this.isBrowser()) {
      sessionStorage.removeItem(key);
    }
  }

  private loadFromStorage() {
    this._userName.set(this.getItem(STORAGE_KEY.userName));
    this._email.set(this.getItem(STORAGE_KEY.email));
    this._accessToken.set(this.getItem(STORAGE_KEY.accessToken));
    this._refreshToken.set(this.getItem(STORAGE_KEY.refreshToken));
  }

  // ---- API Calls
  login(data: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, data);
  }

  register(data: { fullName: string, email: string, password: string }): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  verify(data: { accessToken: string, refreshToken: string }): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/auth/verify`, data);
  }

  isAuthenticated(): boolean {
    return !!this._accessToken();
  }

  isActive(): boolean {
    return this.getItem('isActive') === 'true';
  }

  // ---- Token Handling
  saveTokens(accessToken: string | null, refreshToken?: string | null) {
    this._accessToken.set(accessToken ?? null);
    this._refreshToken.set(refreshToken ?? null);

    if (accessToken) this.setItem(STORAGE_KEY.accessToken, accessToken);
    else this.removeItem(STORAGE_KEY.accessToken);

    if (refreshToken) this.setItem(STORAGE_KEY.refreshToken, refreshToken);
    else this.removeItem(STORAGE_KEY.refreshToken);
  }

  saveAccessToken(token: string) {
    this.setItem(STORAGE_KEY.accessToken, token);
  }

  saveRefreshToken(token: string) {
    this.setItem(STORAGE_KEY.refreshToken, token);
  }

  getAccessToken(): string | null {
    return this.getItem(STORAGE_KEY.accessToken);
  }

  getRefreshToken(): string | null {
    return this.getItem(STORAGE_KEY.refreshToken);
  }

  saveStatus(res: { status: boolean | string }) {
    this.setItem('isActive', String(res.status).toLowerCase() === 'true' ? 'true' : 'false');
  }

  refreshTokenApi() {
    const accessToken = this.getItem(STORAGE_KEY.accessToken);
    const refreshToken = this.getItem(STORAGE_KEY.refreshToken);

    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<any>(`${this.baseUrl}/auth/refresh`, {
      accessToken,
      refreshToken
    });
  }

  // ---- Logout
  logout() {
    this.http.post(`${this.baseUrl}/auth/logout`, {}, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.alertService.success("You have been successfully logged out.");
          this.clearTokens();
        },
        error: (err) => {
          this.clearTokens();
          const status = err?.status;
          if (status === 401) {
            this.alertService.success('You have been logged out.');
          } else if (status === 404) {
            this.alertService.warning(err?.error?.message || 'Logout failed.');
          }
          else {
            this.alertService.warning('Unexpected logout error.');
          }
        }
      });
  }

  // ---- Clear
  clearTokens() {
    this._accessToken.set(null);
    this._refreshToken.set(null);
    this._userName.set(null);
    this._userId.set(null);
    this._email.set(null);

    Object.values(STORAGE_KEY).forEach(key => this.removeItem(key));
    this.removeItem('isActive');

    this.router.navigate(['/login']);
  }

  // ---- Setters
  setUserId(id: number | null) {
    this._userId.set(id ?? null);
  }

  setEmail(email: string | null) {
    const cleaned = email?.trim() || null;
    this._email.set(cleaned);

    if (cleaned) this.setItem(STORAGE_KEY.email, cleaned);
    else this.removeItem(STORAGE_KEY.email);
  }

  setUser(name: string | null) {
    const cleaned = name?.trim() || null;
    this._userName.set(cleaned);

    if (cleaned) this.setItem(STORAGE_KEY.userName, cleaned);
    else this.removeItem(STORAGE_KEY.userName);
  }
}
