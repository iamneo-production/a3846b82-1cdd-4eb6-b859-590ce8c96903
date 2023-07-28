import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { User } from './User';
import { Observable } from 'rxjs';
import { API_URI } from 'src/app/app-constant';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestHeader = new HttpHeaders(
    {
      "NO_AUTH": "True"  
    }
  );

  constructor(private httpClient: HttpClient,
    private userAuth: UserAuthService) { }

  public login(LoginData: any) {
    return this.httpClient.post(`${API_URI}/auth/authenticate`, LoginData, { headers: this.requestHeader });
  }

  registerUser(SignupData: any): Observable<any> {
    return this.httpClient.post<any>(`${API_URI}/auth/register`, SignupData);
  }

  //roles
  useRole: any

  public matchRoles(allowedRoles: string[]): boolean {
    const userRole = this.userAuth.getRoles();

    return allowedRoles.some(role => userRole.includes(role));
  }


  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${API_URI}/dusers`);
  }

}