import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interfaz que representa un profesor en el sistema.
 */
export interface Teacher {
  nombre: string;
  documento: string;
  fechaContrato: Date;
  departmentId: number;
}

/**
 * Servicio para gestionar los profesores en el sistema.
 */
@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private apiUrl = 'http://localhost:3000/teachers';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de todos los profesores.
   * @returns Un observable con un array de profesores.
   */
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  /**
   * Crea un nuevo profesor en el sistema.
   * @param teacher Objeto con la información del profesor.
   * @returns Un observable con el profesor creado.
   */
  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  /**
   * Elimina un profesor del sistema.
   * @param documento Documento de identificación del profesor a eliminar.
   * @returns Un observable con la respuesta de la eliminación.
   */
  deleteTeacher(documento: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${documento}`);
  }

  /**
   * Actualiza la información de un profesor existente.
   * @param teacher Objeto con los datos actualizados del profesor.
   * @returns Un observable con el profesor actualizado.
   */
  updateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.patch<Teacher>(`${this.apiUrl}/${teacher.documento}`, teacher);
  }
}
