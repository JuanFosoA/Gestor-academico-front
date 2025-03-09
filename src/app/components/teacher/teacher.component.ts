import { Component, OnInit } from '@angular/core';
import { Teacher, TeachersService } from '../../services/teachers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Department } from '../department/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-teachers',
  imports:[CommonModule,FormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  departments: Department[] = [];
  newTeacher: Partial<Teacher>={};
  editingTeacher: Teacher | null = null;

  constructor(private teachersService: TeachersService, private departmentService: DepartmentService) {}

  ngOnInit():void {
    this.loadTeachers();
    this.loadDepartments()
  }

  loadTeachers() {
    this.teachersService.getTeachers().subscribe(data => this.teachers = data);
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  addTeacher() {
    if(this.newTeacher.nombre && this.newTeacher.documento && this.newTeacher.fechaContrato && this.newTeacher.departmentId){
      this.newTeacher.fechaContrato = new Date(this.newTeacher.fechaContrato);
      this.teachersService.createTeacher(this.newTeacher as Teacher).subscribe(teacher => {
        console.log(this.newTeacher.nombre);
        console.log(this.newTeacher.documento);
        console.log(this.newTeacher.departmentId);
        console.log(this.newTeacher.fechaContrato);
        this.teachers.push(teacher)
        this.newTeacher = {}
      });
    }

  }

  deleteTeacher(documento: string) {
    this.teachersService.deleteTeacher(documento).subscribe(() => this.loadTeachers());
  }

  editTeacher(teacher: Teacher) {
    this.editingTeacher = { ...teacher };
  }

  updateTeacher() {
    if (this.editingTeacher) {
      this.teachersService.updateTeacher(this.editingTeacher).subscribe(updateTeacher => {
        const index = this.teachers.findIndex(s => s.documento === updateTeacher.documento);
        if (index !== -1) {
          this.teachers[index] = updateTeacher;
        }
        this.editingTeacher = null;
        this.loadTeachers();
      });
    }
  }

  getDepartmentName(departmentId: number): string {
    const department = this.departments.find(d => d.id === departmentId);
    return department ? department.nombre : 'Unknown';
  }
}