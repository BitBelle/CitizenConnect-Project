import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { LogInResponse, LoginUser, SignUpResponse, User } from "../../models/user";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly Base_URL = "http://localhost:4000/auth/"
  retrievedToken = localStorage.getItem('token') as string


  constructor(private http: HttpClient){}


   // if the user is logged in
   public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }


  public showStatus(): boolean {
    const token = localStorage.getItem('token') as string;
    if (token) {
      return true;
    }
    return false;
  }

  signUpUser(newUser: User): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(this.Base_URL + "register", newUser);
  }

  LoginUser(userCredentials: LoginUser): Observable<LogInResponse> {
    return this.http.post<LogInResponse>(this.Base_URL + "login", userCredentials, {
      headers:{
        "Content-Type": "application/json"
      }
    }).pipe(
      tap((response: any) => {
        console.log('Backend Response:', response)
        console.log('Token:', response.token)
        console.log('Payload:', response.payload)
        
      })
    )
  } 
  

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${this.Base_URL}reset-password-request`, { userEmail: email }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }


  getSpecificUser(id: string): Observable<User> {
    return this.http.get<User>(this.Base_URL + id, {
      headers: new HttpHeaders({
        token: this.retrievedToken
      })
    });
  }


  // to be in the status service
  // public isLoggedIn = false

  // showStatus() {
  //   const token = localStorage.getItem('token') as string

  //   if (token) {
  //     this.isLoggedIn = true
  //     return true
  //   }
  //   this.isLoggedIn = false
  //   return false
  // }

  logout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    // this.isLoggedIn = false;
    return true;
  }

  // logout() {     
  //   localStorage.removeItem('userRole');     
  //   localStorage.removeItem('Payload');     
  //   this.router.navigate(['/home']);
  //  }
  
  }








