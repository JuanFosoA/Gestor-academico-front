import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Teacher {
  documento: string;
  nombre: string;
  fechaContrato:string
}

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private apiUrl = 'http://localhost:3000/teachers'; // URL de tu backend

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  getTeacher(documento: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${documento}`);
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  updateTeacher(documento: string, teacher: Partial<Teacher>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${documento}`, teacher);
  }

  deleteTeacher(documento: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${documento}`);
  }
}
