import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Feedback } from '../feedback/feedback';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetlifyFormsService {

  constructor(private http: HttpClient) { }

  submitEntry(fbEntry: Feedback): Observable<string> {
    const body = new HttpParams()
      .set('form-name', 'feedbackForm')
      .append('firstName', fbEntry.firstName)
      .append('lastName', fbEntry.lastName)
      .append('email', fbEntry.email)
      .append('type', fbEntry.type)
      .append('description', fbEntry.description)
      .append('rating', fbEntry.rating.toString());

    return this.http.post(
      '/',
      body.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'text'
      }
    ).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = '';

    if (err.error instanceof ErrorEvent) {
      errMsg = `A client-side error occurred: ${err.error.message}`;
    } else {
      errMsg = `A server-side error occurred. Code: ${err.status}. Message: ${err.message}`;
    }

    return throwError(errMsg);
  }
}
