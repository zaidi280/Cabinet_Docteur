// src/app/components/login/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.signin({ email, password }).subscribe({
      next: (response) => {
        if (response.success) {
          if (response.user.isActive) {
            localStorage.setItem("CC_Token", response.token);
            localStorage.setItem("role", response.user.role);
            if (response.user.role === 'admin') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/patients']);
            }
          } else {
            alert("Account is not activated yet.");
          }
        } else {
          alert("Invalid credentials.");
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.snackBar.open('Email ou mot de passe incorrect', 'Fermer', {
          duration: 3000, // Notification duration (3s)
          panelClass: ['error-snackbar'] // Custom styling
        });
  }
    });
  }
}
