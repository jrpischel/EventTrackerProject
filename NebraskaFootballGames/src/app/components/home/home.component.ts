import { SeasonService } from './../../services/season.service';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Season } from 'src/app/models/season';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  // games: Game[] = [];
  // game: Game | null = null;

  constructor(
      private gameService: GameService,
      private seasonService: SeasonService
  ) {}

  ngOnInit(): void {

  }



  // loadGame(gameId: number) {
  //   this.gameService.index(gameId).subscribe({
  //     next: (game)
  //   })
  // }

}
