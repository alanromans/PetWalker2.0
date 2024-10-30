import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/componets.module';
import { MorePageRoutingModule } from './more-routing.module';

import { MorePage } from './more.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MorePageRoutingModule,
    ComponentsModule
  ],
  declarations: [MorePage]
})
export class MorePageModule {}
