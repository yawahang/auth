import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  let authReq = req;
  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

return next(authReq).pipe(
catchError((error) => {
if (error.status === 401) {
  return authService.refreshTokenApi().pipe(
    switchMap((res: { accessToken: string; refreshToken?: string | null }) => {
      authService.saveTokens(res.accessToken, res.refreshToken ?? null);
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${res.accessToken}`
        }
      });
      return next(cloned);
    }),
    catchError(err => {

        authService.logout();
        return throwError(() => err);
      })
    );
  }
      return throwError(() => error);
    })
  );
};
