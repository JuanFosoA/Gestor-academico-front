import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { DepartmentService } from '../../services/department.service';
import { Course } from './courses.model';
import { Department } from '../department/department.model';

export enum DiaSemana {
  LUNES = 'Lunes',
  MARTES = 'Martes',
  MIERCOLES = 'Miércoles',
  JUEVES = 'Jueves',
  VIERNES = 'Viernes',
  SABADO = 'Sábado',
  DOMINGO = 'Domingo',
}

@Component({
  selector: 'app-course',
  templateUrl: './courses.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./courses.component.css'],
  template: `<h2>Gestión de Cursos</h2>`,
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  departments: Department[] = [];
  diasSemana = Object.values(DiaSemana);
  prerequisites: string = 'None'; 
  newCourse: Partial<Course> = {};
  editingCourse: Course | null = null;

  constructor(private courseService: CoursesService, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadDepartments();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  addCourse(): void {
    if (this.newCourse.nombre && this.newCourse.descripcion && this.newCourse.departmentId) {
      this.courseService.addCourse(this.newCourse as Omit<Course, 'id'>).subscribe(course => {
        this.courses.push(course);
        this.newCourse = {};
      });
    }
  }

  editCourse(course: Course): void {
    this.editingCourse = { ...course };
  }

  updateCourse(): void {
    if (this.editingCourse) {
      this.courseService.updateCourse(this.editingCourse).subscribe(updatedCourse => {
        const index = this.courses.findIndex(c => c.id === updatedCourse.id);
        if (index !== -1) {
          this.courses[index] = updatedCourse;
        }
        this.editingCourse = null;
      });
    }
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.courses = this.courses.filter(c => c.id !== id);
    });
  }

  getDepartmentName(departmentId: number): string {
    const department = this.departments.find(d => d.id === departmentId);
    return department ? department.nombre : 'Unknown';
  }
  
  extractPrerequisiteNames(prerrequisitos?: { nombre: string }[]): string {
    if (!prerrequisitos || prerrequisitos.length === 0) return 'None';
    return prerrequisitos.map(p => p.nombre).join(', ');
  }
  
  
  
}
