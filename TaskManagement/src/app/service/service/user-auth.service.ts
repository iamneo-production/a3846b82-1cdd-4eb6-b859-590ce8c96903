import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private currentUser: any;


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

  //set email
  public setEmail(email:string){
    localStorage.setItem('email',email);
  }

  //get email
  public getEmail():string | null {
    return localStorage.getItem('email');
  }

  //get id
  public getUserId(): number | null{
    const userIdString = localStorage.getItem('userId') ;
      return JSON.parse(userIdString) ;
  }

  //setId
  public setUserId(userId: number | null ): void{
    localStorage.setItem('userId',JSON.stringify(userId));
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


