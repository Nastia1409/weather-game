import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  weatherUrl = '/weather';
  appId = '8395f0b7c682703f162142d17f600194';

  getCityData(cityId: string) {
    const params = new HttpParams()
      .set('q', cityId)
      .set('appid', this.appId);
    return this.http.get(this.weatherUrl, { params });
  }
}
