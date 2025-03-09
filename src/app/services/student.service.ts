import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../components/student/student.model';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar los estudiantes en el sistema.
 */
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de todos los estudiantes.
   * @returns Un observable con un array de estudiantes.
   */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  /**
   * Obtiene un estudiante específico por su cédula.
   * @param id Identificador del estudiante.
   * @returns Un observable con la información del estudiante.
   */
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  /**
   * Agrega un nuevo estudiante al sistema.
   * @param student Objeto con la información del estudiante.
   * @returns Un observable con el estudiante agregado.
   */
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  /**
   * Actualiza la información de un estudiante existente.
   * @param student Objeto con los datos actualizados del estudiante.
   * @returns Un observable con el estudiante actualizado.
   */
  updateStudent(student: Student): Observable<Student> {
    return this.http.patch<Student>(`${this.apiUrl}/${student.cedula}`, student);
  }

  /**
   * Elimina un estudiante del sistema.
   * @param cedula Cédula del estudiante a eliminar.
   * @returns Un observable con la respuesta de la eliminación.
   */
  deleteStudent(cedula: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cedula}`);
  }
}
