import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { EMPTY, Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "../service/service/user-auth.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private userAuth : UserAuthService,
        private router :Router
        ){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     if(req.headers.get("No-Auth")==='True'){
        return next.handle(req.clone());
     }

     const token = this.userAuth.getToken();

     req = this.userToken(req,token ?? '');

     return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse)=>{
                console.log(err.status);
                if(err.status === 401){
                    this.router.navigate(['/login']); 
                }
                else if(err.status === 403){
                    this.router.navigate(['/unauthorized']);
                }
                return EMPTY;
        })
     );

    }
    private userToken(request:HttpRequest<any>,token:string){
        return request.clone(
        {
            setHeaders:{
                Authorization :`Bearer ${token}`
            }
        });
    }
    
}