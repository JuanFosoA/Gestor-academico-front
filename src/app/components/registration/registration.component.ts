import { Component, OnInit } from '@angular/core';
import {
  Registration,
  RegistrationsService,
} from '../../services/registration.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../courses/courses.model';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-registrations',
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationsComponent implements OnInit {
  registrations: Registration[] = [];
  courses: Course[] = [];
  newRegistration: Partial<Registration>={};

  constructor(private registrationsService: RegistrationsService, private coursesService:CoursesService) {}

  ngOnInit() {
    this.loadRegistrations();
    this.loadCourses()
  }

  loadRegistrations() {
    this.registrationsService
      .getRegistrations()
      .subscribe((data) => (this.registrations = data));
  }


  loadCourses(){
    this.coursesService.getCourses().subscribe((data)=>(this.courses=data))
  }

  addRegistration() {
    this.newRegistration.fecha_inscripcion = new Date(this.newRegistration.fecha_inscripcion)
    this.registrationsService
      .createRegistration(this.newRegistration as Registration)
      .subscribe(() => {
        this.loadRegistrations();
        this.newRegistration = {
          studentCedula: '',
          courseId: 0,
          teacherDocumento: '',
        };
      });
  }

  deleteRegistration(id?: number) {
    if (id === undefined) {
      console.error('No se puede eliminar un registro sin un ID válido.');
      return;
    }
    this.registrationsService
      .deleteRegistration(id)
      .subscribe(() => this.loadRegistrations());
  }
}
