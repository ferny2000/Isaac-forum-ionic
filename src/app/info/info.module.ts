import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPageRoutingModule } from './info-routing.module';
import { InfoPage } from './info.page'; // Asegúrate de que este import exista

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPageRoutingModule,
    InfoPage // ✅ CORREGIDO: Se agrega la página al array de imports.
  ],
  // ❌ Se remueve 'declarations'
})
export class InfoPageModule {}