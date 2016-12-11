import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  }
];

export const appNavLocations = [
    {
      title: 'Home',
      route: '/home'
    },
    {
      title: 'Login',
      route: '/login'
    },
    {
      title: 'Sign Up',
      route: '/sign-up'
    }
  ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
