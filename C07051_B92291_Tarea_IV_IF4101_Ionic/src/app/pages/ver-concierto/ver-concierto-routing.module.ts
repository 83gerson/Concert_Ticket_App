import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerConciertoPage } from './ver-concierto.page';

const routes: Routes = [
  {
    path: '',
    component: VerConciertoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerConciertoPageRoutingModule {}
