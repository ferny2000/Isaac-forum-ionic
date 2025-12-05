import { Component, OnInit } from '@angular/core';
// ⚠️ Importamos HttpErrorResponse para leer el status del error
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { IonicModule, NavController, ToastController } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    RouterModule 
  ]
})
export class LoginPage implements OnInit {
  
  credentials = {
    username: '',
    password: ''
  };

  isLoading: boolean = false; 

  // URL del backend Node.js
  private API_URL = 'http://adequate-consideration-production-c314.up.railway.app'; 

  constructor(
    private http: HttpClient, 
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  /**
   * Llama a la API de Node.js en la ruta /auth/login
   */
  async login() {
    if (this.isLoading) return; 
    this.isLoading = true;

    // Usamos la ruta /auth/login que descubriste con Thunder Client [cite: image_7eb4c1.png]
    this.http.post<any>(`${this.API_URL}/auth/login`, this.credentials).subscribe({
      
      // CASO DE ÉXITO
      next: (response) => {
        this.isLoading = false;
        if (response.success) { 
          this.showToast('¡Bienvenido ' + (response.user?.username || '') + '!', 'success');
          // Guardar token/sesión (lógica futura)
          this.navCtrl.navigateRoot('/tabs/home');
        } else {
          // Si la API devuelve success: false (error lógico)
          this.showToast(response.message || 'Error desconocido', 'danger');
        }
      },
      
      // CASO DE ERROR (401, 404, 500, etc.)
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Error de conexión con la API', err);

        let errorMessage = 'Error al conectar con el servidor.';
        
        // ⚠️ ESTA ES LA LÓGICA DE CORRECCIÓN
        if (err.status === 401) {
          // El error 401 (Unauthorized) de tu captura [cite: image_7eb864.png]
          errorMessage = 'Usuario o contraseña incorrectos.';
        } else if (err.status === 404) {
          errorMessage = 'Ruta de API no encontrada (/auth/login).';
        } else if (err.status === 0) {
          errorMessage = 'No se pudo conectar. ¿El servidor está corriendo?';
        }
        
        this.showToast(errorMessage, 'danger');
      }
    });
  }

  /**
   * Muestra un mensaje emergente (Toast)
   */
  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color
    });
    toast.present();
  }
}

