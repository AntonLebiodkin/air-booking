import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';

import { Observable } from "rxjs";

@Injectable()
export class TicketService {
  apiUrl: string = 'http://localhost:3000';

  constructor(private http: Http) { }

  // bookPlace(placeClass: string, raceId: string, userId: string) {
  //   let ticket = {
  //     placeClass,
  //     raceId,
  //     userId
  //   };
  //   return this.http.post(this.apiUrl + '/races/book', ticket, this.jwt()).map((response: Response) => response.json());
  // }
}
