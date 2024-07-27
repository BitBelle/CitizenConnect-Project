import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Polls } from '../../models/polls'

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private baseUrl = 'http://localhost:4000/poll'; 

  constructor(private http: HttpClient) {}

  getPolls(): Observable<Polls[]> {
    return this.http.get<Polls[]>(`${this.baseUrl}`);
  }

  createPoll(poll: Polls): Observable<Polls> {
    return this.http.post<Polls>(`${this.baseUrl}`, poll, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deletePoll(pollId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${pollId}`);
  }

}
