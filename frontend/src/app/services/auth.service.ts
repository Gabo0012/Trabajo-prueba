import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserI } from '../user';
import { JwtResponseI } from '../jwt-response';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  export class AuthService {
    AUTH_SERVER: string = 'http//localhost:3000';
    authSubject = new BehaviorSubject(false);
    private 'token': String;
    constructor(private httpClient: HttpClient) {  }


    register(user: UserI):Observable<JwtResponseI>{
      return this.httpClient.post<JwtResponseI>('${this.AUTH_SERVER}/register',
      user).pipe(tap(
        (res: JwtResponseI)=> {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expireIn);
          }
        })
      );
    }

    login(user: UserI):Observable<JwtResponseI>{
      return this.httpClient.post<JwtResponseI>('${this.AUTH_SERVER}/login',
      user).pipe(tap(
        (res: JwtResponseI)=> {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expireIn);
          }
        })
      );
    }

    logout(): void{
      this.token = '';
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("EXPIRES_IN");
    }

    private saveToken(token: string, expiresIn: string): void {
      localStorage.setItem("ACCESS_TOKEN", token);
      localStorage.setItem("EXPIRES_IN", expiresIn);
      this.token = token;
    }

    private getToken(): String{
      if(!this.token) {
        this.token = localStorage.getItem("ACCESS_TOKEN");
      }
      return this.token;
    }
  }
},
)
