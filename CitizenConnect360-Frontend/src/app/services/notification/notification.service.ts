import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

export interface Request {
  user: User;
  requestedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:4000/auth'; 

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/gov-OfficialRequests`);
  }

  approveUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/approveUser`, { userId });
  }

  clearNotifications(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notifications/clear`);
  }
}
