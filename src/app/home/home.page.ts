// src/app/home/home.page.ts

import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // 👈 Se necesita para elementos ion-*
import { CommonModule } from '@angular/common'; // 👈 Se necesita para *ngIf, *ngFor
import { RouterModule } from '@angular/router'; // 👈 Se necesita para routerLink

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    RouterModule 
  ]
})
export class HomePage {
  // Esta página utiliza el HTML de index.php para navegación y presentación.
  constructor() {}
}