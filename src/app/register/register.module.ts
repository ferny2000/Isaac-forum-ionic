import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page'; // Asegúrate de que este import exista

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    RegisterPage // ✅ CORREGIDO: Se agrega la página al array de imports.
  ],
  // ❌ Se remueve 'declarations'
})
export class RegisterPageModule {}