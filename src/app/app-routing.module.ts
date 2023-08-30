import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard.ts.guard';

const routes: Routes = [
  
  { path: 'callback', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent), 
      canActivate: [authGuard]},
  { path: '**', redirectTo: '/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
