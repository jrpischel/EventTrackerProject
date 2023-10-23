import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { Location } from 'src/app/models/location';
import { Season } from 'src/app/models/season';
import { GameService } from 'src/app/services/game.service';
import { LocationService } from 'src/app/services/location.service';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  games: Game[] = [];
  seasons: Season[] = [];
  locations: Location[] = [];
  selectedGame: Game | null = null;
  newGame: Game = new Game();
  editGame: Game | null = null;
  addNewGame: boolean = false;

  constructor(
    private seasonService: SeasonService,
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadLocations();
    this.loadSeasons();
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let seasonYearStr = params.get('seasonYear');
        if (seasonYearStr) {
          let seasonYear = parseInt(seasonYearStr);
          if (isNaN(seasonYear)) {
            this.router.navigateByUrl('/invalidSeasonId');
          } else {
            this.loadGames(seasonYear);
          }
        }
      },
    });
  }

  displayGame(game: Game) {
    this.selectedGame = game;
  }

  setEditGame(game: Game) {
    this.editGame = Object.assign({}, this.selectedGame);
  }

  loadGames(seasonYear: number) {
    this.gameService.index(seasonYear).subscribe({
      next: (games) => {
        this.games = games;
      },
      error: (problem) => {
        console.error('GameComponent.loadGames(): error loading Games:');
        console.error(problem);
      },
    });
  }

  loadLocations() {
    this.locationService.index().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: (problem) => {
        console.error('GameComponent.loadGames(): error loading Games:');
        console.error(problem);
      },
    });
  }

  loadSeasons() {
    this.seasonService.index().subscribe({
      next: (seasons) => {
        this.seasons = seasons;
      },
      error: (problem) => {
        console.error('GameComponent.loadGames(): error loading Games:');
        console.error(problem);
      },
    });
  }

  addGame(seasonYear: number, game: Game) {
    console.log(game);
    this.gameService.create(seasonYear, game).subscribe({
      next: (result) => {
        this.newGame = new Game();
        this.loadGames(seasonYear);
      },
      error: (nojoy) => {
        console.error('GameListHttpComponent.addGame(): error creating Game:');
        console.error(nojoy);
      },
    });
  }

  updateGame(seasonYear: number, gameId: number, game: Game) {
    this.gameService.update(seasonYear, gameId, game).subscribe({
      next: (result) => {
        this.newGame = new Game();
        this.loadGames(seasonYear);
      },
      error: (nojoy) => {
        console.error(
          'GameListHttpComponent.updateGame(): error updating Game:'
        );
        console.error(nojoy);
      },
    });
  }

  deleteGame(seasonYear: number, gameId: number) {
    this.gameService.destroy(gameId).subscribe({
      next: (result) => {
        console.log();
        this.loadGames(seasonYear);
      },
      error: (nojoy) => {
        console.error(
          'GameListHttpComponent.deleteGame(): error deleting Game:'
        );
        console.error(nojoy);
      },
    });
  }
}
