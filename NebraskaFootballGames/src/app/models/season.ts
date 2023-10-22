export class Season {
  year: number;
  record: string;
  confChamp: boolean;
  natChampAp: boolean;
  natChampCoach: boolean;

  constructor(
  year: number = 0,
  record: string = '',
  confChamp: boolean = false,
  natChampAp: boolean = false,
  natChampCoach: boolean = false

  ){
    this.year = year;
    this.record = record;
    this.confChamp = confChamp;
    this.natChampAp = natChampAp;
    this.natChampCoach = natChampCoach;
  }
}
