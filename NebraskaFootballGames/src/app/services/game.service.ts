import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private url = environment.baseURL + 'api/seasons';

  constructor(
    private http: HttpClient,
  ) { }

  index(gameId: number): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + '/' + gameId + '/games') .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.index(): error retrieving Todo List: ' + err)
        );
      })
    );
  }
}
