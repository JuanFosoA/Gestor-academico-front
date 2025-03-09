import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string | null = null;
  
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  
    onSubmit() {
        if (this.loginForm.valid) {
      
          this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
              this.router.navigate(['/departments']); 
            },
            error: (err) => {
              console.error('Error en login:', err); 
            },
          });
        }
      }
      
    }

