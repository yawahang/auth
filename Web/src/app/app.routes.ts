import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { InfoComponent } from './features/info/info.component';
import { SettingComponent } from './user/setting/setting.component';
import { ProductComponent } from './features/product/product.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ProfileComponent } from './user/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { ActivatePageComponent } from './auth/activate-page/activate-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'activate-page', component: ActivatePageComponent },
      { path: 'info', component: InfoComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'product', component: ProductComponent },
      { path: 'profile', component: ProfileComponent }

    ]
  },
  { path: '**', redirectTo: 'login' }
];
