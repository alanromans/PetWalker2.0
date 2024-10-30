import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosPage } from './pagos.page';

const routes: Routes = [
  {
    path: '',
    component: PagosPage
  },  {
    path: 'pay-information',
    loadChildren: () => import('./pay-information/pay-information.module').then( m => m.PayInformationPageModule)
  },
  {
    path: 'pay-toggle',
    loadChildren: () => import('./pay-toggle/pay-toggle.module').then( m => m.PayTogglePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosPageRoutingModule {}
