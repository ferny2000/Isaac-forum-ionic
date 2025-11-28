import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home', // Pestaña de Inicio
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'info', // Pestaña de Información
        loadChildren: () => import('../info/info.module').then(m => m.InfoPageModule)
      },
      {
        path: 'foro', // Pestaña del Foro
        loadChildren: () => import('../foro/foro.module').then(m => m.ForoPageModule)
      },
      {
        path: 'login', // 👈 Login como pestaña hija
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register', // 👈 Register como pestaña hija
        loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home', 
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }