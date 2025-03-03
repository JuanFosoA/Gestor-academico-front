import { Component, OnInit } from '@angular/core';
import { Registration, RegistrationsService } from '../../services/registration.service';


@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {
  registrations: Registration[] = [];
  newRegistration: Registration = { studentCedula: '', courseId: 0, teacherDocumento: '' };

  constructor(private registrationsService: RegistrationsService) {}

  ngOnInit() {
    this.loadRegistrations();
  }

  loadRegistrations() {
    this.registrationsService.getRegistrations().subscribe(data => this.registrations = data);
  }

  addRegistration() {
    this.registrationsService.createRegistration(this.newRegistration).subscribe(() => {
      this.loadRegistrations();
      this.newRegistration = { studentCedula: '', courseId: 0, teacherDocumento: '' };
    });
  }

  deleteRegistration(id: number) {
    this.registrationsService.deleteRegistration(id).subscribe(() => this.loadRegistrations());
  }
}