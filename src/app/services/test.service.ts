import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Test {
  codigo: string;
  descripcion: string;
  fecha: Date;
  courseId: number;
  studentDocument: string;
  grade: number;
}

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:3000/tests';

  constructor(private http: HttpClient) {}

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.apiUrl);
  }

  createTest(test: Test): Observable<Test> {
    return this.http.post<Test>(this.apiUrl, test);
  }

  deleteTest(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`);
  }
  updateTest(codigo: string, test: Test): Observable<Test> {
    return this.http.patch<Test>(`${this.apiUrl}/${codigo}`, test);
  }
}
