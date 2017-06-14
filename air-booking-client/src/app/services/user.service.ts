import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';

import { User } from '../models/user';
import { Observable, Subject } from "rxjs";

@Injectable()
export class UserService {
  apiUrl: string = 'http://localhost:3000';
  user: Subject<User> = new Subject<User>();

  constructor(private http: Http) { }

  emailExists(control: any): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('email', control.value);

    return this.http.get(this.apiUrl + '/users/emailExists', { search: params}).map((response: Response) => {
      let res = response.json();
      if (res.exists) {
        return {'emailExists': true}
      } else {
        return
      }
    });
  }

  getAll() {
    return this.http.get(this.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
  }

  getById(_id: string) {
    return this.http.get(this.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post(this.apiUrl + '/users/register', user, this.jwt());
  }

  update(user: User) {
    return this.http.put(this.apiUrl + '/users/' + user._id, user, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.apiUrl + '/users/' + _id, this.jwt());
  }

  updateUser() {
    let _id = JSON.parse(localStorage.getItem('currentUser'))._id;
    return this.http.get(this.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => this.user.next(response.json() as User)).subscribe();
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  getTicketsByUserId(id: string) {
    return this.http.get(this.apiUrl + `/users/${id}/tickets/`, this.jwt()).map((response: Response) => response.json());
  }

  addMoney(id: string, amount: number) {
    return this.http.post(this.apiUrl + `/users/${id}/addMoney`, { amount: amount }, this.jwt()).map((response: Response) => {
      this.user.next(response.json() as User);
    });
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
