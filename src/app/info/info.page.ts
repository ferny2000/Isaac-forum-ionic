import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 👈 Usamos HttpClient directo
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule 
  ]
})
export class InfoPage implements OnInit {
  
  // Variables para almacenar los datos
  logros: any[] = [];
  cartas: any[] = [];
  runas: any[] = [];
  jefes: any[] = [];
  personajes: any[] = [];
  pildoras: any[] = [];
  transformaciones: any[] = [];
  niveles: any[] = [];
  monstruosPorNivel: { level: string, list: any[] }[] = []; 

  searchTerm: string = '';
  isLoading: boolean = true; // Para mostrar un spinner mientras carga

  // 👇 Tu API del backend
  private API_URL = 'http://adequate-consideration-production-c314.up.railway.app'; 

  constructor(private http: HttpClient) { } 

  ngOnInit() {
    this.loadGameData();
  }

  loadGameData() {
    this.isLoading = true;

    // ⚠️ PETICIÓN DIRECTA AL BACKEND
    // Asumimos que en tu backend tienes la ruta '/info' configurada para devolver el JSON
    this.http.get<any>(`${this.API_URL}/info`).subscribe({
      next: (data) => {
        this.isLoading = false;
        
        if (data) {
          // Repartimos los datos del JSON a nuestras variables
          this.logros = data.logros || [];
          this.cartas = data.cartas || [];
          this.runas = data.runas || [];
          this.jefes = data.jefes || [];
          this.personajes = data.personajes || [];
          this.pildoras = data.pildoras || [];
          this.transformaciones = data.transformaciones || [];
          
          // Aplanar niveles
          this.niveles = (data.niveles || []).flat(); 
          
          // Procesar monstruos (Objeto -> Array)
          const monstruosObj = data.monstruos || {};
          this.monstruosPorNivel = Object.keys(monstruosObj).map(level => ({
              level: level,
              list: monstruosObj[level]
          }));
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al conectar con la API de Info:', err);
        // Aquí podrías mostrar un Toast de error si quieres
      }
    });
  }
}