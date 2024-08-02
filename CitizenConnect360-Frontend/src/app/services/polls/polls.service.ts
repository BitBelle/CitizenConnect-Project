import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pollRequest, Polls } from '../../models/polls'

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private baseUrl = 'http://localhost:4000/poll'; 

  constructor(private http: HttpClient) {}

  

  addPoll(poll: pollRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, poll)
  }



  getPolls(): Observable<Polls[]> {
    return this.http.get<Polls[]>(`${this.baseUrl}`);
  }




  deletePoll(pollId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${pollId}`);
  }

}
