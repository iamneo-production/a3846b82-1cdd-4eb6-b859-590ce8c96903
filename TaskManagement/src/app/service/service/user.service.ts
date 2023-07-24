import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { User } from './User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestHeader = new HttpHeaders(
    {
      "NO_AUTH": "True"  // means that this end point doest need any authentication
    }
  );

  constructor(private httpClient: HttpClient,
    private userAuth: UserAuthService) { }

  public login(LoginData: any) {
    return this.httpClient.post("https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/auth/authenticate", LoginData, { headers: this.requestHeader });
  }

  registerUser(SignupData: any): Observable<any> {
    return this.httpClient.post<any>(`https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/auth/register`, SignupData);
  }

  //roles
  useRole: any

  public matchRoles(allowedRoles: string[]): boolean {
    const userRole = this.userAuth.getRoles();

    return allowedRoles.some(role => userRole.includes(role));
  }


  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>("https://8080-dfbdbabdfcfdedeaeaadbdbabf.project.examly.io/dusers");
  }

}
