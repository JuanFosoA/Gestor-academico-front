import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) {}

  /**
   * Inicia sesión en el sistema y almacena el token en localStorage.
   * @param credentials Credenciales del usuario (nombre de usuario y contraseña).
   * @returns Un observable con el token de autenticación en formato string.
   */
  login(credentials: { username: string; password: string }): Observable<string> {
    return this.http.post(this.apiUrl, credentials, { responseType: 'text' }).pipe(
      tap((token) => {
        localStorage.setItem('token', token);
      })
    );
  }

  /**
   * Cierra la sesión eliminando el token de autenticación del localStorage.
   */
  logout() {
    localStorage.removeItem('token');
  }

  /**
   * Verifica si el usuario está autenticado comprobando la existencia de un token.
   * @returns `true` si hay un token almacenado, `false` en caso contrario.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
