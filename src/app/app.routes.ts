import { Routes } from '@angular/router';
import { DepartmentComponent } from './components/department/department.component';
import { CourseComponent } from './components/courses/courses.component';
import { StudentComponent } from './components/student/student.component';
import { LoginComponent } from './components/auth/login.component';
import { TeachersComponent } from './components/teacher/teacher.component';
import { RegistrationsComponent } from './components/registration/registration.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'departments', component: DepartmentComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'students', component: StudentComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'registrations', component: RegistrationsComponent },
  { path: 'tests', component: TestComponent },
];