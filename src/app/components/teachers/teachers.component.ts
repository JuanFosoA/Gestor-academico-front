import { Component, OnInit } from '@angular/core';
import { TeachersService, Teacher } from '../../services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  newTeacher: Teacher = { documento: '', nombre: '', fechaContrato:'' };
  selectedTeacher: Teacher | null = null;

  constructor(private teachersService: TeachersService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teachersService.getTeachers().subscribe(data => this.teachers = data);
  }

  addTeacher(): void {
    this.teachersService.createTeacher(this.newTeacher).subscribe(() => {
      this.loadTeachers();
      this.newTeacher = { documento: '', nombre: '', fechaContrato:''};
    });
  }

  editTeacher(teacher: Teacher): void {
    this.selectedTeacher = { ...teacher };
  }

  updateTeacher(): void {
    if (this.selectedTeacher) {
      this.teachersService.updateTeacher(this.selectedTeacher.documento, this.selectedTeacher)
        .subscribe(() => {
          this.loadTeachers();
          this.selectedTeacher = null;
        });
    }
  }

  deleteTeacher(documento: string): void {
    this.teachersService.deleteTeacher(documento).subscribe(() => this.loadTeachers());
  }
}
