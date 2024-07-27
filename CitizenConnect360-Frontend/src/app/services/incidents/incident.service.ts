import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { incidentRequest, incidentResponse, Incidents } from '../../models/incidents';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  getView(incidentId: string) {
      throw new Error("Method not implemented.");
  }
  

  private readonly BaseURL = "http://localhost:4000/incident"

  retrievedToken = localStorage.getItem('token') as string
  constructor(private http: HttpClient) { }


  addIncident(newIncident: incidentRequest): Observable<incidentResponse> {
    console.log(this.addIncident);
    return this.http.post<incidentResponse>(this.BaseURL, newIncident)
  }



  getIncidents(): Observable<Incidents[]> {
    console.log('reaching here');

    return this.http.get<Incidents[]>(this.BaseURL);
  }


  getIncident(viewId: string): Observable<Incidents> {
    return this.http.get<Incidents>(this.BaseURL + viewId, {
      headers: new HttpHeaders({
        token: this.retrievedToken

      })
    });
  }



  updateIncident(updatedIncident: Incidents, incidentId: string): Observable<{ message: string }> {

    return this.http.patch<{ message: string }>(this.BaseURL + incidentId, updatedIncident, {
      headers: new HttpHeaders({
        token: this.retrievedToken
      })
    });
  }



  deleteIncident(incidentId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.BaseURL + incidentId, {
      headers: new HttpHeaders({
        token: this.retrievedToken
      })
    });
  }

}
