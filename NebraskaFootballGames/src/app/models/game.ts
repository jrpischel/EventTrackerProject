export class Game {
  id: number;
  gameDate: string;
  dayOfWeek: string;
  homeGame: boolean;
  opponent: string;


  constructor(
    id: number = 0,
  gameDate: string = '',
  dayOfWeek: string = '',
  homeGame: boolean = false,
  opponent: string = ''

  ){
    this.id = id;
    this.gameDate = gameDate;
    this.dayOfWeek = dayOfWeek;
    this.homeGame = homeGame;
    this.opponent = opponent;

  }
}
