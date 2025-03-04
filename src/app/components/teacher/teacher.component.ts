import { Component, OnInit } from '@angular/core';
import { Teacher, TeachersService } from '../../services/teachers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teachers',
  imports:[CommonModule,FormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  newTeacher: Partial<Teacher>={};
  editingTeacher: Teacher | null = null;

  constructor(private teachersService: TeachersService) {}

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teachersService.getTeachers().subscribe(data => this.teachers = data);
  }

  addTeacher() {
    this.teachersService.createTeacher(this.newTeacher as Teacher).subscribe((teacher) => {
      this.teachers.push(teacher)
      this.newTeacher = {}
    });
  }

  deleteTeacher(documento: string) {
    this.teachersService.deleteTeacher(documento).subscribe(() => this.loadTeachers());
  }

  editTeacher(teacher: Teacher) {
    this.editingTeacher = { ...teacher };
  }

  updateTeacher() {
    if (this.editingTeacher) {
      this.teachersService.updateTeacher(this.editingTeacher.documento, this.editingTeacher).subscribe(() => {
        this.loadTeachers();
        this.editingTeacher = null;
      });
    }
  }
}