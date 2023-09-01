import { Route, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard.ts.guard';

export const appRoutes: Route[] = [

    { 
        path: 'callback', loadComponent:
        () => import('./home/home.component').then(m => m.HomeComponent)
    },
    { 
        path: 'login', loadComponent: 
        () => import('./login/login.component').then(m => m.LoginComponent)
    },
    { 
        path: '', loadComponent: 
        () => import('./home/home.component').then(m => m.HomeComponent), 
        canActivate: [authGuard]
    },
    { 
        path: '**', 
        redirectTo: '/home' 
    }
    
  ];


