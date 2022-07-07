import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './modules/auth-layout/auth-layout.component';
import { LoginComponent } from './modules/auth-layout/pages/login/login.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
