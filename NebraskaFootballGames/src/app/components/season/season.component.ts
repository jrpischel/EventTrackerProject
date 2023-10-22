import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Season } from 'src/app/models/season';
import { GameService } from 'src/app/services/game.service';
import { SeasonService } from 'src/app/services/season.service';
import { environment } from 'src/environments/environment';
import { GameComponent } from '../game/game.component';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css'],
})
export class SeasonComponent implements OnInit {
  private baseUrl = 'http://localhost:8085/';
  private url = this.baseUrl + 'api/seasons';

  seasons: Season[] = [];
  games: Game[] = [];
  selectedSeason: Season | null = null;
  seasonsTitle: string = 'Nebraska Football Seasons';
  newSeason: Season = new Season();
  editSeason: Season | null = null;
  addNewSeason: boolean = false;

  constructor(
    private seasonService: SeasonService,
    private gameService: GameService,
    // private gameComponent: GameComponent,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSeasons();
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let seasonYearStr = params.get('seasonYear');
        if (seasonYearStr) {
          let seasonYear = parseInt(seasonYearStr);
          if (isNaN(seasonYear)) {
            this.router.navigateByUrl('/invalidSeasonId');
          } else {
            this.seasonService.show(seasonYear).subscribe({
              next: (season) => {
                this.selectedSeason = season;
              },
              error: (nojoy) => {
                console.error(
                  'SeasonListHttpComponent.show(): error getting Season:'
                );
                this.router.navigateByUrl('/invalidSeasonId');
              },
            });
          }
        }
      },
    });
  }

  displaySeason() {
    this.editSeason = Object.assign({}, this.selectedSeason);
  }

  setEditSeason(season: Season) {
    this.selectedSeason = season;
  }

  goToGameTable(seasonYear: number) {
    this.router.navigateByUrl('/seasons/' + seasonYear + '/games');
    // this.loadGames(seasonYear);
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

  loadSeasons() {
    this.seasonService.index().subscribe({
      next: (seasons) => {
        this.seasons = seasons;
      },
      error: (problem) => {
        console.error('HomeComponent.loadSesons(): error loading seasons:');
        console.error(problem);
      },
    });
  }

  addSeason(season: Season) {
    this.seasonService.create(season).subscribe({
      next: (result) => {
        this.newSeason = new Season();
        this.loadSeasons();
      },
      error: (nojoy) => {
        console.error(
          'SeasonListHttpComponent.addSeason(): error creating Season:'
        );
        console.error(nojoy);
      },
    });
  }

  updateSeason(seasonYear: number, season: Season) {
    this.seasonService.update(seasonYear, season).subscribe({
      next: (result) => {
        this.newSeason = new Season();
        this.loadSeasons();
      },
      error: (nojoy) => {
        console.error(
          'SeasonListHttpComponent.addSeason(): error updating Season:'
        );
        console.error(nojoy);
      },
    });
  }

  deleteSeason(seasonYear: number) {
    this.seasonService.destroy(seasonYear).subscribe({
      next: (result) => {
        console.log();
        this.loadSeasons();
      },
      error: (nojoy) => {
        console.error(
          'SeasonListHttpComponent.addSeason(): error deleting Season:'
        );
        console.error(nojoy);
      },
    });
  }
}
