import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';
import { Season } from '../models/season';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  private url = environment.baseUrl + 'api/seasons';


  constructor(
    private http: HttpClient,
  ) { }

  index(): Observable<Season[]> {
    return this.http.get<Season[]>(this.url) .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('SeasonService.index(): error retrieving Season List: ' + err)
        );
      })
    );
  }


show(seasonYear: number): Observable<Season> {
  return this.http.get<Season>(this.url +'/'+ seasonYear).pipe(
    catchError((err: any) => {
      console.log(err);
      return throwError(
        () => new Error('SeasonService.show(): error retrieving Season: ' + err)
      );
    })
  );
}

create(season: Season): Observable<Season> {
  console.log(season)
  return this.http.post<Season>(this.url, season).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError(
         () => new Error( 'SeasonService.create(): error creating Season: ' + err )
      );
    })
  );
}

update(seasonYear: number, season: Season): Observable<Season> {
  return this.http.put<Season>(this.url +'/'+ seasonYear, season).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError(
         () => new Error( 'SeasonService.update(): error updating Season: ' + err )
      );
    })
  );
}

destroy(seasonYear: number) : Observable<void> {
  return this.http.delete<void>(this.url +'/'+ seasonYear).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError(
         () => new Error( 'SeasonService.destroy(): error deleting Season: ' + err )
      );
    })
  );
}


}
