import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConciertoPage } from './concierto.page';

const routes: Routes = [
  {
    path: '',
    component: ConciertoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConciertoPageRoutingModule {}
