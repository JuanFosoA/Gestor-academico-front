import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Teacher {
  nombre: string;
  documento:string;
  fechaContrato: Date;
  departmentId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private apiUrl = 'http://localhost:3000/teachers';

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  deleteTeacher(documento: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${documento}`);
  }
  updateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.patch<Teacher>(`${this.apiUrl}/${teacher.documento}`, teacher);
  }
}