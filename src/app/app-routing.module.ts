import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/DoLogin/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register-selection',
    loadChildren: () => import('./pages/DoLogin/register-selection/register-selection.module').then( m => m.RegisterSelectionPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/DoLogin/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'adverts-info',
    loadChildren: () => import('./pages/Advert/adverts-info/adverts-info.module').then( m => m.AdvertsInfoPageModule)
  },
  {
    path: 'adverts',
    loadChildren: () => import('./pages/Advert/adverts/adverts.module').then( m => m.AdvertsPageModule)
  },
  {
    path: 'more',
    loadChildren: () => import('./pages/Advert/more/more.module').then( m => m.MorePageModule)
  },
  {
    path: 'privacity',
    loadChildren: () => import('./pages/menu/privacity/privacity.module').then( m => m.PrivacityPageModule)
  },
  {
    path: 'politic',
    loadChildren: () => import('./pages/menu/politic/politic.module').then( m => m.PoliticPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/profiles/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'profile-pets',
    loadChildren: () => import('./pages/profiles/profile-pets/profile-pets.module').then( m => m.ProfilePetsPageModule)
  },
  {
    path: 'comments',
    loadChildren: () => import('./pages/comments/comments.module').then( m => m.CommentsPageModule)
  },
  {
    path: 'register-pets',
    loadChildren: () => import('./pages/register-pets/register-pets.module').then( m => m.RegisterPetsPageModule)
  },
  {
    path: 'pays',
    loadChildren: () => import('./pages/menu/pays/pays.module').then( m => m.PaysPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
