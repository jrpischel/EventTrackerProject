import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  private url = environment.baseUrl + 'api/seasons';

  public isCollapsed = true;

  constructor(
    private router: Router
  ){}


}
