import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GuessData } from '../models/guess-data.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private CITIES = ['Haifa', 'Tel Aviv', 'Sederot', 'Rosh Pinna', 'Tirat Karmel'];
  private TURNS_AMOUNT = 5;
  private GUESS_DELTA = 5;
  private MINIMAL_GUESS_FOR_WINNING = 3;

  private cityIndex: number = 0;
  private rightGuesses: number = 0;

  private userGuessesSub: BehaviorSubject<Array<GuessData>> = new BehaviorSubject<Array<GuessData>>([]);
  private userWonSub: Subject<boolean> = new Subject<boolean>();

  constructor(private httpService: HttpService) { }

  get cityName() {
    const currI = this.cityIndex;
    this.cityIndex = (this.cityIndex + 1) % 5;
    return this.CITIES[currI];
  }

  get userGuesses$() {
    return this.userGuessesSub.asObservable();
  }

  get userWon$() {
    return this.userWonSub.asObservable();
  }

  addGuess(cityName: string, userAnswer: number): void {
    this.httpService.getCityData(cityName).subscribe((data: any) => {
      const rightAnswer = data.main.temp;
      const guessData = { userAnswer, rightAnswer: data.main.temp, equal: this.checkGuess(userAnswer, rightAnswer) };
      if (guessData.equal)
        this.rightGuesses++;
      this.saveGuessData(guessData);
      this.isGameOver();
    });
  }

  private checkGuess(userAnswer: number, rightAnswer: number): boolean {
    return Math.abs(userAnswer - rightAnswer) <= this.GUESS_DELTA;
  }

  private saveGuessData(guessData: GuessData): void {
    const currGuessesVal = this.userGuessesSub.getValue();
    currGuessesVal.push(guessData);
    this.userGuessesSub.next(currGuessesVal);
  }

  private isGameOver(): void {
    const currGuessesVal = this.userGuessesSub.getValue();
    if (currGuessesVal.length < this.TURNS_AMOUNT) {
      return;
    }

    this.userWonSub.next(this.rightGuesses >= this.MINIMAL_GUESS_FOR_WINNING);
  }

}
