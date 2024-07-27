import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GovDashboardService {

  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/count`);
  }

  getTotalViews(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/views/count`);
  }

  getTotalIncidents(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/incidents/count`);
  }
}
