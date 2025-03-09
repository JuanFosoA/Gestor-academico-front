import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Interfaz que representa una prueba o examen en el sistema.
 */
export interface Test {
  codigo: string;
  descripcion: string;
  fecha: Date;
  courseId: number;
  studentDocument: string;
  grade: number;
}

/**
 * Servicio para gestionar las pruebas en el sistema.
 */
@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:3000/tests';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de todas las pruebas registradas.
   * @returns Un observable con un array de pruebas.
   */
  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.apiUrl);
  }

  /**
   * Crea una nueva prueba en el sistema.
   * @param test Objeto con la información de la prueba.
   * @returns Un observable con la prueba creada.
   */
  createTest(test: Test): Observable<Test> {
    return this.http.post<Test>(this.apiUrl, test);
  }

  /**
   * Elimina una prueba del sistema.
   * @param codigo Código identificador de la prueba a eliminar.
   * @returns Un observable con la respuesta de la eliminación.
   */
  deleteTest(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`);
  }

  /**
   * Actualiza la información de una prueba existente.
   * @param codigo Código de la prueba a actualizar.
   * @param test Objeto con los datos actualizados de la prueba.
   * @returns Un observable con la prueba actualizada.
   */
  updateTest(codigo: string, test: Test): Observable<Test> {
    return this.http.patch<Test>(`${this.apiUrl}/${codigo}`, test);
  }
}
