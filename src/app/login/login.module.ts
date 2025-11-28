import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page'; // Asegúrate de que este import exista

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    LoginPage // ✅ CORREGIDO: Se agrega la página al array de imports.
  ],
  // ❌ Se remueve 'declarations'
})
export class LoginPageModule {}