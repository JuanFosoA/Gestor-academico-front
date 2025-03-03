import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../components/student/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';
  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
      return this.http.get<Student[]>(this.apiUrl);
    }
  
    getStudent(id: number): Observable<Student> {
      return this.http.get<Student>(`${this.apiUrl}/${id}`);
    }
  
    addStudent(student: Student): Observable<Student> {
      return this.http.post<Student>(this.apiUrl, student);
    }
  
    updateStudent(student: Student): Observable<Student> {
      return this.http.patch<Student>(`${this.apiUrl}/${student.cedula}`, student);
    }
  
    deleteStudent(cedula: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${cedula}`);
    }
}
