export class Location {
  id: number;
  stadium: string;
  city: string;
  state: string;

  constructor(
    id: number = 0,
    stadium: string = '',
    city: string = '',
    state: string = ''
  ) {
    this.id = id;
    this.stadium = stadium;
    this.city = city;
    this.state = state;
  }
}
