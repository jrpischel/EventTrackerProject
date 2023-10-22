import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private url = environment.baseUrl + 'api/';

  constructor(
    private http: HttpClient,
  ) { }

  index(seasonYear: number): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + 'seasons/' + seasonYear + '/games') .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('GameService.index(): error retrieving List of Games: ' + err)
        );
      })
    );
  }


  show(gameId: number): Observable<Game> {
    return this.http.get<Game>(this.url + 'games/'+ gameId).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('GameService.show(): error retrieving Game: ' + err)
        );
      })
    );
  }

  create(seasonYear: number, game: Game): Observable<Game> {
    console.log(game)
    return this.http.post<Game>(this.url + 'seasons/' + seasonYear + '/games', game).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'GameService.create(): error creating Game: ' + err )
        );
      })
    );
  }

  update(seasonYear: number, gameId: number, game: Game): Observable<Game> {
    return this.http.put<Game>(this.url + 'seasons/' + seasonYear + '/games/' + gameId, game).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'GameService.update(): error updating Game: ' + err )
        );
      })
    );
  }

  destroy(gameId: number) : Observable<void> {
    return this.http.delete<void>(this.url + 'games/'+ gameId).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'GameService.destroy(): error deleting Game: ' + err )
        );
      })
    );
  }


}
