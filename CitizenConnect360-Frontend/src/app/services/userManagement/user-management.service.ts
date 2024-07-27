import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  
  private apiUrl = 'http://localhost:4000/auth/';

  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users`);
  }


  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${userId}`);
  }


  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications`);
  }

  // assignRole(userId: string, role: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/users/assign-role`, { userId, role });
  // }


  // restoreUser(userId: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/restore`, { userId });
  // }

  // clearNotifications(): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/notifications/clear`, {});
  // }

  // approveGovernmentOfficial(userId: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/notifications/approve`, { userId });
  // }
}
