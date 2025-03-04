import { Component, OnInit } from '@angular/core';
import {
  Registration,
  RegistrationsService,
} from '../../services/registration.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrations',
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationsComponent implements OnInit {
  registrations: Registration[] = [];
  newRegistration: Registration = {
    studentCedula: '',
    courseId: 0,
    teacherDocumento: '',
  };

  constructor(private registrationsService: RegistrationsService) {}

  ngOnInit() {
    this.loadRegistrations();
  }

  loadRegistrations() {
    this.registrationsService
      .getRegistrations()
      .subscribe((data) => (this.registrations = data));
  }

  addRegistration() {
    this.registrationsService
      .createRegistration(this.newRegistration)
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
