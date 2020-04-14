import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AppDataService} from '../data/app-data.service';
import AppFormData from '../../models/AppFormData';
import {catchError, map} from 'rxjs/operators';
import AppServerResponse from '../../models/AppServerResponse';

@Injectable({
  providedIn: 'root'
})
export class AppDataResolverService implements Resolve<any> {

  constructor(private dataService: AppDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AppServerResponse> {
    const queryParams = Object.keys(route.queryParams);
    if (route.queryParams && ['date', 'last_name', 'first_name'].every(key => queryParams.includes(key))) {
      return this.dataService.sendData(route.queryParams as AppFormData).pipe(
        map((data: AppServerResponse) => {
          return new AppServerResponse(true, data.data);
        }),
        catchError((res => {
          return of(new AppServerResponse(false, null, res));
        }))
      );
    }
    return of(null);
  }
}
