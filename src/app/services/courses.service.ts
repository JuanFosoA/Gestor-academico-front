import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../components/courses/courses.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = 'http://localhost:3000/courses';
  
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de todos los cursos disponibles.
   * @returns Un observable con un array de cursos.
   */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  /**
   * Obtiene un curso específico por su ID.
   * @param id Identificador del curso.
   * @returns Un observable con la información del curso.
   */
  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  /**
   * Agrega un nuevo curso al sistema.
   * @param course Objeto que contiene la información del curso (sin el ID).
   * @returns Un observable con el curso creado.
   */
  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  /**
   * Actualiza un curso existente.
   * @param course Objeto con los datos actualizados del curso.
   * @returns Un observable con el curso modificado.
   */
  updateCourse(course: Course): Observable<Course> {
    return this.http.patch<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  /**
   * Elimina un curso del sistema.
   * @param id Identificador del curso a eliminar.
   * @returns Un observable sin contenido.
   */
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
