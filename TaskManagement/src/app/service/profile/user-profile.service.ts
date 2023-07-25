import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<any> {
    // Implement the logic to retrieve user details
    // This could be an HTTP request or retrieving from storage
    // For now, let's return a dummy data
    return of({
      firstName: 'Tony',
      lastName: 'Stark',
      username: 'tonystark',
      email: 'tony@example.com',
      password: 'Abc@1234589',
    });
  }

}
