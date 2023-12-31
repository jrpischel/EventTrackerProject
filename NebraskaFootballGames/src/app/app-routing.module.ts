import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SeasonComponent } from './components/season/season.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'seasons/:seasonYear/games', component: GameComponent },
  { path: 'seasons', component: SeasonComponent },
  { path: 'seasons/:seasonYear', component: SeasonComponent },
  { path: 'seasons/:seasonYear/games/:gameId', component: GameComponent },
  { path: 'games/:gameId', component: GameComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
