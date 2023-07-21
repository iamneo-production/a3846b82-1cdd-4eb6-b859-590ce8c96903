import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(role:[]){
    localStorage.setItem('role',JSON.stringify(role));
  }

  //get roles 
  public getRoles(): string[] {
      const rolesString = localStorage.getItem('role') || '[]';
      return JSON.parse(rolesString) || [];
  }

  //setToken methos
  public setToken(jwtToken:string){
    localStorage.setItem('access_token',jwtToken);
  }

  //get token methos
  public getToken():string | null {
    return localStorage.getItem('access_token')
  }

  //clear method -- to clear the local storage
  public clear(){
    localStorage.clear();
  }

  //is logged in method
  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

}
