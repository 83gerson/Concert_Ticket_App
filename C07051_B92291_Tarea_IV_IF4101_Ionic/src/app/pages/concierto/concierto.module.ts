import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConciertoPageRoutingModule } from './concierto-routing.module';

import { ConciertoPage } from './concierto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConciertoPageRoutingModule
  ],
  declarations: [ConciertoPage]
})
export class ConciertoPageModule {}
