import { Routes } from '@angular/router';
import { DepartmentComponent } from './components/department/department.component';
import { CourseComponent } from './components/courses/courses.component';
import { StudentComponent } from './components/student/student.component';

export const routes: Routes = [
  { path: 'departments', component: DepartmentComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'students', component: StudentComponent },
];
