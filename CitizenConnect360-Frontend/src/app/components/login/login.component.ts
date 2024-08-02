import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AppState } from '../../State';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../State/Actions/auth.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm!: FormGroup
  forgotPasswordForm!: FormGroup;
  showForgotPassword = false;
  errorMessage: string | null = null



  constructor(private fb: FormBuilder, private router: Router, private store:Store<AppState>) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userEmail: this.fb.control('', [Validators.required, Validators.email]),
      upassword: this.fb.control('', Validators.required)
    })

    
    this.forgotPasswordForm = this.fb.group({
      resetEmail: ['', [Validators.required, Validators.email]]
    })
  }

  

  onSubmit() {
    // console.log(this.loginForm);
    this.store.dispatch(AuthActions.login({user:this.loginForm.value}))
    
  }
  

  toggleForgotPassword() {
    this.showForgotPassword = !this.showForgotPassword;
  }


  onForgotPasswordSubmit() {
    if (this.forgotPasswordForm.valid) {
      const resetEmail = this.forgotPasswordForm.value.resetEmail
      console.log('Form valid dispatchin action', resetEmail)
      this.store.dispatch(AuthActions.requestPasswordReset({ userEmail: resetEmail }));
    } else {
      console.log('Form Valid');
      
    }
  }

}
