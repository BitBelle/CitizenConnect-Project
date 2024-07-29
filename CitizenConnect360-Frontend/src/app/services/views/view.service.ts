import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AddView, Views } from '../../models/view';

@Injectable({
  providedIn: 'root'
})

export class ViewService {

  private readonly BaseURL ="http://localhost:4000/view"

  private readonly ChatbotURL ="http://127.0.0.1:5000/educate-chat"

  retrievedToken = localStorage.getItem('token') as string

  
  constructor(private http:HttpClient) { }


  // addView(newView:AddView):Observable<Views>{
  //   return this.http.post<Views>(this.BaseURL,newView)
  // }

  addView(newView: AddView): Observable<Views> {
    return this.http.post<Views>(this.BaseURL, newView).pipe(
      tap(response => console.log('Response from addView:', response)),  // Log the response
      catchError(error => {
        console.error('Error adding view:', error);
        return throwError(error);
      })
    );
  }
  

  getViews(): Observable<Views[]> {
    console.log('reaching here');
    
    return this.http.get<Views[]>(this.BaseURL);
  }

  
  getView(viewId: string): Observable<Views> {
    return this.http.get<Views>(this.BaseURL + viewId, {
      headers: new HttpHeaders({
        token: this.retrievedToken
        
      })
    });
  }


  getChatbotSummary(userMessage: string): Observable<any> {
    const requestPayload = {
      userId: localStorage.getItem('userId'),  // Ensure you have the user ID
      query: userMessage
    };

    return this.http.post<any>(this.ChatbotURL, requestPayload).pipe(
      tap(response => console.log('Response from chatbot:', response)),
      catchError(error => {
        console.error('Error fetching chatbot summary:', error);
        return throwError(error);
      })
    );
  }

  
  updateView(updatedView: AddView, viewId: string): Observable<{ message: string }> {

    return this.http.patch<{ message: string }>(this.BaseURL + viewId, updatedView, {
      headers: new HttpHeaders({
        token: this.retrievedToken
      })
    });
  }


  
  deleteView(viewId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.BaseURL + viewId, {
      headers: new HttpHeaders({
        token: this.retrievedToken
      })
    });
  }

}
