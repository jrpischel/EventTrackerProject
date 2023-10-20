import { Component } from '@angular/core';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  games: Game[] = [];
  selected: Game | null = null;

  ngOnInit(): void {
    //TODO
  }

  loadGames() {
    this.gameService.index().subscribe({

    })
  }

}
