// src/app/services/isaac-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Renombramos el servicio al nombre original para mantener la coherencia
@Injectable({
  providedIn: 'root'
})
export class IsaacDataService {
  
  // La ruta al archivo JSON estático
  private jsonPath = 'assets/data/isaac_data.json'; 

  // Inyectamos el HttpClient para poder hacer peticiones
  constructor(private http: HttpClient) { }

  /**
   * Carga y devuelve todos los datos del juego como un Observable.
   */
  getGameData(): Observable<any> {
    return this.http.get(this.jsonPath);
  }

  // --- MÉTODOS PÚBLICOS PARA ACCEDER A DATOS ESPECÍFICOS ---

  // Ahora los métodos usan 'pipe' y 'map' para extraer el array de logros
  getLogros(): Observable<any[]> {
    return this.getGameData().pipe(
      map(data => data.logros || [])
    );
  }

  getMonstruos(): Observable<any> {
    return this.getGameData().pipe(
      map(data => data.monstruos || {})
    );
  }
  
  // Puedes añadir más métodos similares aquí (getCartas(), getPersonajes(), etc.)
}