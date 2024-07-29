import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { LogInResponse, LoginUser, Payload, SignUpResponse, User } from "../../models/user";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly Base_URL = "http://localhost:4000/auth/"
  // retrievedToken = localStorage.getItem('token') as string

  private userName!: string


  constructor(private http: HttpClient, private router: Router){}


   public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }

  public getUserName(): string | undefined {
    return this.userName;
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
        const token = response.token
        if (token) {
          localStorage.setItem('token', token);
          try {
            const tokenParts = token.split('.');
            if (tokenParts.length === 3) {
              const payload = tokenParts[1];
              const decodedPayload = JSON.parse(atob(payload));
              this.userName = decodedPayload.userName; // Extracted from the payload
              console.log('Decoded Payload:', decodedPayload);
            } else {
              throw new Error('Invalid token structure');
            }
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      })
    )
  } 
  

  public showStatus(): boolean {
    const token = localStorage.getItem('token') as string;
    if (token) {
      return true;
    }
    return false;
  }


  requestPasswordReset(email: string): Observable<any> {
    return this.http.post<any>(`${this.Base_URL}reset-password-request`, { userEmail: email }, {
      headers: {
        "Content-Type": "application/json"
      }
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
    this.router.navigate(['/home']);
    // this.isLoggedIn = false;
    return true;
  }

  
  }




