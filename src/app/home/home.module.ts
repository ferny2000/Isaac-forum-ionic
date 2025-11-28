import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page'; // Asegúrate de que este import exista

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HomePage // ✅ CORREGIDO: Se agrega la página al array de imports.
  ],
  // ❌ Se remueve 'declarations'
})
export class HomePageModule {}