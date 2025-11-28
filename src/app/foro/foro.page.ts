import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    RouterModule 
  ]
})
export class ForoPage implements OnInit {
  
  posts: any[] = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false; 

  newPost = {
    title: '',
    content: '',
    image_url: '', // Aquí guardaremos la imagen en Base64
    author_id: 1 
  };
  
  private API_URL = 'http://localhost:3001'; 

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { } 

  ngOnInit() {
    this.loadPosts();
  }

  handleRefresh(event: any) {
    this.loadPosts(event);
  }

  loadPosts(event?: any) {
    if (!event) this.isLoading = true;
    
    this.http.get<any[]>(`${this.API_URL}/posts`).subscribe({
      next: (data) => {
        this.posts = data;
        this.isLoading = false;
        if (event) event.target.complete();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        if (event) event.target.complete();
        console.error('Error al cargar posts:', err);
        this.posts = this.getPlaceholderPosts();
        this.showToast('No se pudo conectar al servidor. Mostrando modo offline.', 'warning');
      }
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  createPost() {
    this.setOpen(true);
  }

  // --- NUEVA FUNCIÓN: Manejar selección de archivo ---
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Usamos FileReader para convertir la imagen a texto (Base64)
      const reader = new FileReader();
      reader.onload = () => {
        // El resultado es un string largo: "data:image/jpeg;base64,..."
        this.newPost.image_url = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitPost() {
    if (!this.newPost.title || !this.newPost.content) {
      this.showToast('El título y el contenido son obligatorios.', 'warning');
      return;
    }

    this.http.post(`${this.API_URL}/posts`, this.newPost).subscribe({
      next: (response: any) => {
        this.showToast('¡Publicación creada exitosamente!', 'success');
        this.setOpen(false); 
        this.loadPosts(); 
        
        this.newPost = { title: '', content: '', image_url: '', author_id: 1 };
      },
      error: (err) => {
        console.error('Error al crear post:', err);
        this.showToast('Error al crear la publicación. Puede que la imagen sea muy pesada.', 'danger');
      }
    });
  }
  
  getPlaceholderPosts(): any[] {
    return [
      { id: 1, title: '¡Bienvenido al nuevo foro!', content: 'Esta es una publicación de prueba mientras construimos el Backend.', author: 'Sistema', created_at: new Date().toISOString(), image_url: '' },
    ];
  }
  
  async showToast(message: string, color: 'success' | 'danger' | 'warning' | 'secondary') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}