import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private url = environment.baseUrl + 'api/games/locations';

  constructor(
    private http: HttpClient,
  ) { }

  index(): Observable<Location[]> {
    return this.http.get<Location[]>(this.url) .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('GameService.index(): error retrieving List of Games: ' + err)
        );
      })
    );
  }
}
