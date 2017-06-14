import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
  config: any = '../app.config';

  constructor(private http: Http, private router: Router) {

	}

	login(email: string, password: string) {
		return this.http.post('http://localhost:3000' + '/users/authenticate/', { email: email, password: password })
			.map((response: Response) => {
		    let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
			})
	}

	loggedIn() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    return user !== null && user.token !== null
  }

	logout() {
	  localStorage.removeItem('currentUser');
	}
}
