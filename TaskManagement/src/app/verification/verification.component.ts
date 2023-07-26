import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  verificationCode: string="";
  verificationMessage: string = "";
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.verificationCode = params['code'];
    });
  }

  submitVerification() 
  {
    if (this.verificationCode) {
      const verificationUrl = 'http://localhost:8080/register'; 

      this.http.post(verificationUrl, { code: this.verificationCode }).subscribe(
        (response: any) => {
          if (response.success) {
            this.verificationMessage = "Account verification successful!";
            // Perform any additional actions after successful verification if needed
          } else {
            this.verificationMessage = "Account verification failed. Please try again.";
            // Handle the case where verification fails, show error message or take appropriate action
          }
        },
        (error: any) => {
          this.verificationMessage = "An error occurred while verifying your account.";
          // Handle any error that occurs during verification
        }
      );
    }
  }

}
