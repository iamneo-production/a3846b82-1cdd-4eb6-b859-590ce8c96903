import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user-details/user-details.component';
import { UserService } from '../service/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | any;
  user:User[];

  constructor(private formBuilder: FormBuilder,private router: Router,
              private userService:UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), this.validateName]],
      email: ['', [Validators.required, Validators.email, this.validateEmail]],
      /*phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.validatePhoneNumber]],*/
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required,]
    }, { validator: this.passwordMatchValidator });
  } 
  validateName(control: AbstractControl): { [key: string]: boolean } | null {
    const name = control.value;
    const validNameRegex = /^[A-Za-z\s]+$/;; // Matches only alphabets

    if (!validNameRegex.test(name)) {
      return { 'invalidName': true };
    }

    return null;
  }
  validateEmail(control: AbstractControl): { [key: string]: boolean } | null {
    const email = control.value;
    const validEmailRegex = /@gmail\.com$/; // Matches email ending with @gmail.com

    if (!validEmailRegex.test(email)) {
      return { 'invalidEmail': true };
    }

    return null;
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return; 
    }
    this.userService.registerUser(this.signupForm.value).subscribe(
      (response) => {
        // Handle success response
        console.log(response);
        // Redirect to success page or show success message
        this.router.navigate(['/verification']);
      },
      (error: any) => {
        // Handle error response
        this.router.navigate(['/verification']);
        console.error(error);
        // Show error message to the user
  })
}
}