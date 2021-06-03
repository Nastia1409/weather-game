import { Component } from '@angular/core';
import { HttpService } from './services/http.service';


import { GameDataService } from './services/game-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-game';
  cityName: string;
  currGuess: string = '';
  userMessage = '';

  constructor(public gameDataService: GameDataService) {
    this.cityName = this.gameDataService.cityName;

    gameDataService.userWon$.subscribe(val => {
      if (val === undefined) {
        return;
      }

      this.userMessage = val ? 'You won!' : 'You lost';
    });
  }

  checkGuess() {
    this.gameDataService.addGuess(this.cityName, Number.parseFloat(this.currGuess));
    this.currGuess = '';
    this.cityName = this.gameDataService.cityName;
  }



}
