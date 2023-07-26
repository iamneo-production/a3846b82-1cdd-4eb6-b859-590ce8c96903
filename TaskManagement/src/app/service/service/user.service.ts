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
      "NO_AUTH": "True"  // means that this end point doest need any authentication
    }
  );

  constructor(private httpClient: HttpClient,
    private userAuth: UserAuthService) { }

  public login(LoginData: any) {
<<<<<<< HEAD
    return this.httpClient.post("https://8081-daacccaccfeeefcfdedeaeaadbdbabf.project.examly.io/auth/authenticate", LoginData, { headers: this.requestHeader });
  }

  registerUser(SignupData: any): Observable<any> {
    return this.httpClient.post<any>(`https://8081-daacccaccfeeefcfdedeaeaadbdbabf.project.examly.io/auth/register`, SignupData);
=======
    return this.httpClient.post(`${API_URI}/auth/authenticate`, LoginData, { headers: this.requestHeader });
  }

  registerUser(SignupData: any): Observable<any> {
    return this.httpClient.post<any>(`${API_URI}/auth/register`, SignupData);
>>>>>>> c186abd56538dad7a548cb6ada3d309a5e42c70d
  }

  //roles
  useRole: any

  public matchRoles(allowedRoles: string[]): boolean {
    const userRole = this.userAuth.getRoles();

    return allowedRoles.some(role => userRole.includes(role));
  }


  getUserList(): Observable<User[]> {
<<<<<<< HEAD
    return this.httpClient.get<User[]>("https://8081-daacccaccfeeefcfdedeaeaadbdbabf.project.examly.io/dusers");
=======
    return this.httpClient.get<User[]>(`${API_URI}/dusers`);
>>>>>>> c186abd56538dad7a548cb6ada3d309a5e42c70d
  }

}