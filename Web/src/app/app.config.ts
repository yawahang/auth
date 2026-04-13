import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideRouter(routes,withRouterConfig({onSameUrlNavigation:'reload'})), 
    provideBrowserGlobalErrorListeners(), 
    provideClientHydration(withEventReplay())
  
  ]
};
