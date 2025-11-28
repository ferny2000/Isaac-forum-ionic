import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Para la API
import { IonicModule, NavController, ToastController } from '@ionic/angular'; // UI
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class RegisterPage implements OnInit {
  
  credentials = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isLoading: boolean = false;

  // URL de tu backend Node.js
  private API_URL = 'http://localhost:3001';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async register() {
    // 1. Validar contraseñas
    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.showToast('Las contraseñas no coinciden.', 'danger');
      return;
    }

    if (this.isLoading) return;
    this.isLoading = true;
    
    // 2. Enviar datos a /auth/register
    // Nota: enviamos 'credentials'. El backend ignorará 'confirmPassword' si no lo usa,
    // pero contiene username, email y password que es lo importante.
    this.http.post<any>(`${this.API_URL}/auth/register`, this.credentials).subscribe({
      
      // ÉXITO
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.showToast('¡Cuenta creada! Por favor inicia sesión.', 'success');
          // Redirigir al Login para que el usuario entre
          this.navCtrl.navigateRoot('/tabs/login');
        } else {
          this.showToast(response.message || 'Error al registrar.', 'danger');
        }
      },

      // ERROR
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Error de registro:', err);
        
        let msg = 'Error al conectar con el servidor.';
        if (err.status === 400) msg = 'Faltan datos o el usuario ya existe.';
        
        this.showToast(msg, 'danger');
      }
    });
  }

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