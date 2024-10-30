import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertsInfoPageRoutingModule } from './adverts-info-routing.module';
import { ComponentsModule } from 'src/app/components/componets.module';

import { AdvertsInfoPage } from './adverts-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvertsInfoPageRoutingModule,
    ComponentsModule
  ],

  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AdvertsInfoPage]
})
export class AdvertsInfoPageModule {}
