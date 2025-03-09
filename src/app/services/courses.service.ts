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
  
    getCourses(): Observable<Course[]> {
      return this.http.get<Course[]>(this.apiUrl);
    }
  
    getCourse(id: number): Observable<Course> {
      return this.http.get<Course>(`${this.apiUrl}/${id}`);
    }
  
    addCourse(course: Omit<Course, 'id'>): Observable<Course> {
      return this.http.post<Course>(this.apiUrl, course);
    }
  
    updateCourse(course: Course): Observable<Course> {
      return this.http.patch<Course>(`${this.apiUrl}/${course.id}`, course);
    }
  
    deleteCourse(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
