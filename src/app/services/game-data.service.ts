import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  cities = ['Haifa', 'Tel Aviv', 'Sederot', 'Rosh Pinna', 'Tirat Karmel'];
  cityIndex: number = 0;
  userGuessesSub: BehaviorSubject<Array<{ guess: number, rightAnswer: number }>> = new BehaviorSubject<Array<{ guess: number, rightAnswer: number }>>([]);

  constructor(private httpService: HttpService) { }

  get cityName() {
    const currI = this.cityIndex;
    this.cityIndex = (this.cityIndex + 1) % 5;
    return this.cities[currI];
  }

  get userGuesses$() {
    return this.userGuessesSub.asObservable();
  }

  addGuess(cityName: string, guess: number): void {
    this.httpService.getCityData(cityName).subscribe((data: any) => {
      const currVal = this.userGuessesSub.getValue();
      currVal.push({ guess, rightAnswer: data.main.temp });
      this.userGuessesSub.next(currVal);
    });
  }

}
