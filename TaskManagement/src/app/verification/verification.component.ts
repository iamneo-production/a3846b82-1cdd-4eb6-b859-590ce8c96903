import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  verificationCode: string="";
  verificationMessage: string = "";
  otpForm: FormGroup | any;
  error:string = "";

 

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private http: HttpClient, ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.verificationCode = params['code'];
    });
  }

  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      verificationCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  submitVerification() 
  {
    console.log(this.otpForm.value.verificationCode)
    if (this.otpForm.value.verificationCode) {
      const verificationUrl = `https://8080-daacccaccfeeefcfdedeaeaadbdbabf.project.examly.io/confirm-account?token=${this.otpForm.value.verificationCode}`; // Replace with your backend API endpoint for verification

      this.http.get(verificationUrl).subscribe(
        (response: any) => {
          if (response.status === 200) {
            this.error = "Account verification successful!";
           
            
            // Perform any additional actions after successful verification if needed
          } else {
            this.verificationMessage = "Account verification failed. Please try again.";
            // Handle the case where verification fails, show error message or take appropriate action
          }
        },
        (error: any) => {
          console.log(error)
          if(error.status === 200){
          alert("Account verification successful!");
          this.error = error.error.text;
          }
          else{
            alert(error.error);
            this.error = error.error
          }
          // Handle any error that occurs during verification
        }
      );
    }
  }
}
