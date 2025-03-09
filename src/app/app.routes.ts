import { Routes } from '@angular/router';
import { DepartmentComponent } from './components/department/department.component';
import { CourseComponent } from './components/courses/courses.component';
import { StudentComponent } from './components/student/student.component';
import { LoginComponent } from './components/auth/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/departments', pathMatch: 'full' },
  { path: 'departments', component: DepartmentComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'students', component: StudentComponent },
];
