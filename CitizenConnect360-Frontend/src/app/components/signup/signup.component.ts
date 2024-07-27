import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { errorSelectorLogin, errorSelectorSignup, successSelectorLogin, successSelectorSignup } from '../../State/Selectors/auth.selector';
import { AuthActions } from '../../State/Actions/auth.action';
import { AppState } from '../../State';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  isTermsModalVisible = false;
  imageError: string | null = null;
  previewUrl: string | null = null;
  // loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private store:Store<AppState>) {
    this.signUpForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      upassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
      ]],
      roleName: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {}

  openTermsModal(event: Event): void {
    event.preventDefault();
    this.isTermsModalVisible = true;
  }

  closeTermsModal(): void {
    this.isTermsModalVisible = false;
  }

// User Image part
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Optionally, add more validations for the file
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        this.imageError = 'File size should not exceed 5MB';
      } else {
        this.imageError = null;
      }
    }
  }


  signupSuccessMessage$ = this.store.select(successSelectorSignup)
  loginSuccessMessage$ = this.store.select(successSelectorLogin)

  
  signupErrorMessage$ = this.store.select(errorSelectorSignup)
  loginErrorMessage$ = this.store.select(errorSelectorLogin)


  onSubmit(signUpForm:string){
    // console.log("Form submitted");
    
    if (signUpForm === 'signup') {
      console.log("Sign up form submitted")


      this.store.dispatch(AuthActions.signup({user:this.signUpForm.value}))

        
    }
  }
}
