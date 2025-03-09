import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { Department } from './department.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<h2>Gestión de Departamentos</h2>`
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  selectedDepartment: string = '';
  newDepartment: Partial<Department> = {};
  editingDepartment: Department | null = null;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  addDepartment(): void {
    if (this.newDepartment.nombre) {
      this.departmentService.addDepartment(this.newDepartment as Omit<Department, 'id'>).subscribe(dept => {
        this.departments.push(dept);
        this.newDepartment = {};
      });
    }
  }

  editDepartment(department: Department): void {
    this.editingDepartment = { ...department };
  }

  updateDepartment(): void {
    if (this.editingDepartment) {
      this.departmentService.updateDepartment(this.editingDepartment).subscribe(updatedDept => {
        const index = this.departments.findIndex(d => d.id === updatedDept.id);
        if (index !== -1) {
          this.departments[index] = updatedDept;
        }
        this.editingDepartment = null;
      });
    }
  }

  deleteDepartment(id: number): void {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.departments = this.departments.filter(d => d.id !== id);
    });
  }
}
