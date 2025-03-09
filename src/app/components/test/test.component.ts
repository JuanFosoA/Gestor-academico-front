import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Test, TestService } from '../../services/test.service';
import { Student } from '../student/student.model';
import { Course } from '../courses/courses.model';
import { StudentService } from '../../services/student.service';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-test',
  imports: [CommonModule, FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  tests: Test[] = [];
  students: Student[] = [];
  courses: Course[] = [];
  newTest: Partial<Test> = {};
  editingTest: Test | null = null;

  constructor(
    private testService: TestService,
    private studentService: StudentService,
    private courseService: CoursesService
  ) {}

  ngOnInit(){
    this.loadTests()
    this.loadCourses()
    this.loadStudents()
  }

  loadTests() {
    this.testService.getTests().subscribe((data) => (this.tests = data));
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  addTest() {
    if (
      this.newTest.codigo &&
      this.newTest.descripcion &&
      this.newTest.fecha &&
      this.newTest.studentDocument &&
      this.newTest.courseId
    ) {
      this.newTest.fecha = new Date(this.newTest.fecha);
      this.testService.createTest(this.newTest as Test).subscribe((test) => {
        this.tests.push(test);
        this.newTest = {};
      });
    }
  }

  deleteTest(codigo: string) {
    this.testService.deleteTest(codigo).subscribe(() => this.loadTests());
  }

  editTest(test: Test) {
    this.editingTest = { ...test };
  }

  updateTest() {
    if (this.editingTest) {
      this.testService.updateTest(this.editingTest.codigo, this.editingTest).subscribe(() => {
        this.loadTests();
        this.editingTest = null;
      });
    }
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(d => d.id === courseId);
    return course ? course.nombre : 'Unknown';
  }

  getStudentName(studentDocument: string): string {
    const student = this.students.find(d => d.cedula === studentDocument);
    return student ? student.nombre : 'Unknown';
  }
  
}
