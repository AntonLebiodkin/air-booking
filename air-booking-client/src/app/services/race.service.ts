import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';

import { Observable } from "rxjs";

@Injectable()
export class RaceService {
  apiUrl: string = 'http://localhost:3000';

  constructor(private http: Http) { }

  getAll() {
    console.log(this.apiUrl + '/races/');
    return this.http.get(this.apiUrl + '/races/', this.jwt()).map((response: Response) => response.json());
  }

  getById(_id: string) {
    return this.http.get(this.apiUrl + '/races/' + _id, this.jwt()).map((response: Response) => response.json());
  }

  getRaceByPlacesCount(_id: string) {
    return this.http.get(this.apiUrl + '/races/getRaceWithPlacesCount/' + _id, this.jwt()).map((response: Response) => response.json());
  }

  create(race: any) {
    console.log('create race ', race);
    return this.http.post(this.apiUrl + '/races/create', race, this.jwt()).map((response: Response) => response.json());
  }

  bookPlace(placeChoosed: any, raceId: string, userId: string) {
    let ticket = {
      placeChoosed,
      raceId,
      userId
    };
    return this.http.post(this.apiUrl + '/races/book', ticket, this.jwt()).map((response: Response) => response.json());
  }

  update(race: any) {
    return this.http.put(this.apiUrl + '/races/' + race._id, race, this.jwt()).map((response: Response) => response.json());
  }

  findByCountry(direction: any) {
    let params: URLSearchParams = new URLSearchParams();
    if (direction.from.country) {
      params.set('fromCountry', direction.from.country);
    }
    if (direction.to.country) {
      params.set('toCountry', direction.to.country);
    }

    return this.http.get(this.apiUrl + '/races/find', { search: params }).map((response: Response) => response.json());
  }

  delete(_id: any) {
    return this.http.delete(this.apiUrl + '/races/' + _id, this.jwt());
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
