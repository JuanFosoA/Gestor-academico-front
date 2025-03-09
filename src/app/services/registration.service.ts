import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interfaz que representa una inscripción en un curso.
 */
export interface Registration {
  id?: number;
  studentCedula: string;
  courseId: number;
  teacherDocumento: string;
  estado?: string;
  fecha_inscripcion: Date;
  nota_final?: number;
}

@Injectable({ providedIn: 'root' })
export class RegistrationsService {
  private apiUrl = 'http://localhost:3000/registrations';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de todas las inscripciones.
   * @returns Un observable con un array de inscripciones.
   */
  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.apiUrl);
  }

  /**
   * Obtiene una inscripción específica por su ID.
   * @param id Identificador de la inscripción.
   * @returns Un observable con la información de la inscripción.
   */
  getRegistration(id: number): Observable<Registration> {
    return this.http.get<Registration>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una nueva inscripción en el sistema.
   * @param registration Objeto con la información de la inscripción.
   * @returns Un observable con la inscripción creada.
   */
  createRegistration(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(this.apiUrl, registration);
  }

  /**
   * Actualiza una inscripción existente.
   * @param registration Objeto con los datos actualizados de la inscripción.
   * @returns Un observable con la respuesta de la actualización.
   */
  updateRegistration(registration: Registration): Observable<any> {
    return this.http.put(`${this.apiUrl}/${registration.id}`, registration);
  }

  /**
   * Elimina una inscripción del sistema.
   * @param id Identificador de la inscripción a eliminar.
   * @returns Un observable con la respuesta de la eliminación.
   */
  deleteRegistration(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
