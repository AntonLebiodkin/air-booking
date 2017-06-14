import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { Observable } from "rxjs";

@Injectable()
export class PlaneService {
  apiUrl: string = 'http://localhost:3000';

  constructor(private http: Http) { }

  currentPlane: any = null;

  getAll() {
    return this.http.get(this.apiUrl + '/planes/', this.jwt()).map((response: Response) => response.json());
  }

  getById(_id: string) {
    return this.http.get(this.apiUrl + '/planes/' + _id, this.jwt()).map((response: Response) => response.json());
  }

  create(plane: any) {
    return this.http.post(this.apiUrl + '/planes/create', plane, this.jwt()).map((response: Response) => response.json());
  }

  setCurrentPlane(plane: any) {
    this.currentPlane = plane;
  }

  getCurrentPlane() {
    return this.currentPlane;
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
