import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = 'http://localhost:3001'; // Cambia esto si el backend está en otro puerto

  constructor(private http: HttpClient) { }

  // Método para hacer login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseURL}/auth/login`, { email, password });
  }

  // Método para registrar un nuevo usuario
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseURL}/auth/register`, { username, email, password });
  }

  // Obtener todos los posts
  getPosts(): Observable<any> {
    return this.http.get(`${this.baseURL}/posts`);
  }

  // Obtener replies de un post
  getReplies(post_id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/replies/${post_id}`);
  }

  // Crear un nuevo reply
  createReply(post_id: number, user_id: number, content: string): Observable<any> {
    return this.http.post(`${this.baseURL}/replies`, { post_id, user_id, content });
  }

  // Crear un nuevo post
  createPost(author_id: number, title: string, content: string, image_url?: string): Observable<any> {
    return this.http.post(`${this.baseURL}/posts`, { author_id, title, content, image_url });
  }
}
