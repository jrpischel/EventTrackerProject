import { Location } from "./location";
import { Season } from "./season";

export class Game {
  id: number;
  gameDate: string;
  dayOfWeek: string;
  homeGame: boolean;
  opponent: string;
  oppTeamName: string;
  oppLogoUrl: string;
  conference: string;
  win: boolean;
  points: number;
  oppPoints: number;
  televised: boolean;
  network: string;
  bowlGame: boolean;
  season: Season;
  location: Location;


  constructor(
    id: number = 0,
  gameDate: string = '',
  dayOfWeek: string = '',
  homeGame: boolean = false,
  opponent: string = '',
  oppTeamName: string = '',
  oppLogoUrl: string = '',
  conference: string = '',
  win: boolean = false,
  points: number = 0,
  oppPoints: number = 0,
  televised: boolean = false,
  network: string = '',
  bowlGame: boolean = false,
  season: Season = new Season(),
  location: Location = new Location()

  ){
    this.id = id;
    this.gameDate = gameDate;
    this.dayOfWeek = dayOfWeek;
    this.homeGame = homeGame;
    this.opponent = opponent;
    this.oppTeamName = oppTeamName;
    this.oppLogoUrl = oppLogoUrl;
    this.conference = conference;
    this.win = win;
    this.points = points;
    this.oppPoints = oppPoints;
    this.televised = televised;
    this.network = network;
    this.bowlGame = bowlGame;
    this.season = season;
    this.location = location;

  }
}
