// src/app/foro/foro.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ⚠️ ¡IMPORTANTE! Asegúrate de que esta línea esté presente
import { IonicModule } from '@ionic/angular'; 

import { ForoPageRoutingModule } from './foro-routing.module';
import { ForoPage } from './foro.page'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // 1. MÓDULO DE IONIC: Lo que enseña a Angular sobre las etiquetas ion-*
    IonicModule, 
    ForoPageRoutingModule,
    // 2. CORRECCIÓN STANDALONE: El componente standalone se importa aquí
    ForoPage
  ],
  // declarations: [] (Ya está vacío o comentado)
})
export class ForoPageModule {}