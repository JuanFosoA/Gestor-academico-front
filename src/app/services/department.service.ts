import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../components/department/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:3000/departments';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de todos los departamentos.
   * @returns Un observable con un array de departamentos.
   */
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  /**
   * Obtiene un departamento específico por su ID.
   * @param id Identificador del departamento.
   * @returns Un observable con la información del departamento.
   */
  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  /**
   * Agrega un nuevo departamento al sistema.
   * @param department Objeto con la información del departamento (sin el ID).
   * @returns Un observable con el departamento creado.
   */
  addDepartment(department: Omit<Department, 'id'>): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  /**
   * Actualiza un departamento existente.
   * @param department Objeto con los datos actualizados del departamento.
   * @returns Un observable con el departamento modificado.
   */
  updateDepartment(department: Department): Observable<Department> {
    return this.http.patch<Department>(`${this.apiUrl}/${department.id}`, department);
  }

  /**
   * Elimina un departamento del sistema.
   * @param id Identificador del departamento a eliminar.
   * @returns Un observable sin contenido.
   */
  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
