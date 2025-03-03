import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Grade {
  id?: number;
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private apiUrl = 'http://localhost:3000/grades';

  constructor(private http: HttpClient) {}

  getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl);
  }

  getGrade(id: number): Observable<Grade> {
    return this.http.get<Grade>(`${this.apiUrl}/${id}`);
  }

  createGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.apiUrl, grade);
  }

  updateGrade(id: number, grade: Grade): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, grade);
  }

  deleteGrade(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
