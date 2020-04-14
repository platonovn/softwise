import {Injectable} from '@angular/core';
import {combineLatest, interval, Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import AppFormData from '../../models/AppFormData';
import {catchError, map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  private apiPath = 'https://haff-273414.appspot.com';
  public isLoading = false;

  constructor(
    private http: HttpClient
  ) {
  }

  sendData(data: AppFormData): Observable<any> {
    this.isLoading = true;
    return this.http.post(this.apiPath, data)
      .pipe(
        tap(() => this.isLoading = false),
        catchError(err => {
          return this.handleError(err);
        })
      );
  }

  handleError(error) {
    this.isLoading = false;
    return throwError(error || 'server error.');
  }
}
