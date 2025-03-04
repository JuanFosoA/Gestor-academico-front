import { Component } from '@angular/core';
import { Grade, GradeService } from '../../services/grade.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grade',
  imports:[CommonModule,FormsModule],
  templateUrl: './grade.component.html',
  styleUrl: './grade.component.css'
})
export class GradeComponent {
  grades: Grade[] = [];
  newGrade: Grade = { name: '', score: 0 };

  constructor(private gradesService: GradeService
  ) {}

  ngOnInit() {
    this.loadGrades();
  }

  loadGrades() {
    this.gradesService.getGrades().subscribe(data => this.grades = data);
  }

  addGrade() {
    this.gradesService.createGrade(this.newGrade).subscribe(() => {
      this.loadGrades();
      this.newGrade = { name: '', score: 0 };
    });
  }

  deleteGrade(id: number) {
    this.gradesService.deleteGrade(id).subscribe(() => this.loadGrades());
  }
}
