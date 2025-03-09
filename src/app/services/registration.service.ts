import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Registration {
  id?: number;
  studentCedula: string;
  courseId: number;
  teacherDocumento: string;
  estado?: string;
  fecha_inscripcion:Date
  nota_final?:number
}

@Injectable({ providedIn: 'root' })
export class RegistrationsService {
  private apiUrl = 'http://localhost:3000/registrations';

  constructor(private http: HttpClient) {}

  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.apiUrl);
  }

  getRegistration(id: number): Observable<Registration> {
    return this.http.get<Registration>(`${this.apiUrl}/${id}`);
  }

  createRegistration(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(this.apiUrl, registration);
  }

  updateRegistration(id: number, registration: Registration): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, registration);
  }

  deleteRegistration(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}