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

  private apiUrl = "http://localhost:8080/register";

  getRegister(data:Users): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(this.apiUrl, data);
}
}