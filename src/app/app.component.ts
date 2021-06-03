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

  constructor(private httpService: HttpService,
    public gameDataService: GameDataService
  ) {
    this.cityName = this.gameDataService.cityName;
  }

  checkGuess() {
    this.gameDataService.addGuess(this.cityName, Number.parseFloat(this.currGuess));
    this.currGuess = '';
    this.cityName = this.gameDataService.cityName;
  }
}
