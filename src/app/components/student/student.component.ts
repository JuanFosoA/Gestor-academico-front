import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from './student.model';
import { StudentService } from '../../services/student.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{
  students: Student[] = [];
  newStudent: Partial<Student> = {};
  editingStudent: Student | null = null;

  constructor(private studentService: StudentService, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  addStudent(): void {
    if (this.newStudent.nombre && this.newStudent.cedula && this.newStudent.fechaNacimiento) {
      this.studentService.addStudent(this.newStudent as Student).subscribe(student => {
        this.students.push(student);
        this.newStudent = {};
      });
    }
  }

  editStudent(student: Student): void {
    this.editingStudent = { ...student };
  }

  updateStudent(): void {
    if (this.editingStudent) {
      this.studentService.updateStudent(this.editingStudent).subscribe(updatedStudent => {
        const index = this.students.findIndex(s => s.cedula === updatedStudent.cedula);
        if (index !== -1) {
          this.students[index] = updatedStudent;
        }
        this.editingStudent = null;
      });
    }
  }

  deleteStudent(cedula: string): void {
    this.studentService.deleteStudent(cedula).subscribe(() => {
      this.students = this.students.filter(s => s.cedula !== cedula);
    });
  }
}
