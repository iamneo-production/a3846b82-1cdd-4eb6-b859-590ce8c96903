import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

interface Users
{
  name:String;
  email:String;
  password:String;
}
export interface RegistrationResponse {
  message: string;
  status: number;
  // Add any other fields returned by the API if needed
}
@Injectable({
  providedIn: 'root'
})

export class SignupService {
  constructor(private http: HttpClient) { }
  public apiUrl = "http://localhost:8080"; 

  //getRegister(data:Users): Observable<RegistrationResponse>
  registerUser(user: any): Observable<RegistrationResponse>
  {
    const url = `${this.apiUrl}/register`;
    return this.http.post<RegistrationResponse>(url, user);
}
}


export class VerifyOtp {
  constructor(private http: HttpClient) { }

  public apiUrl = "http://localhost:8080/confirm-account";

  verifyOtpFunc(token:String): Observable<RegistrationResponse> {
    return this.http.get<RegistrationResponse>(`${this.apiUrl}?token=${token}`);
}
}

  

