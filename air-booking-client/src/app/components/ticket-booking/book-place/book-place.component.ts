import { Component, OnInit } from '@angular/core';
import {RaceService} from "../../../services/race.service";
import {AlertService} from "../../../services/alert.service";
import { ActivatedRoute, Router } from '@angular/router';
import { TicketCardComponent } from "../../ticket-card/ticket-card.component";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user";
import { Location } from '@angular/common';

declare var $;

@Component({
  selector: 'app-book-place',
  templateUrl: './book-place.component.html',
  styleUrls: ['./book-place.component.css']
})
export class BookPlaceComponent implements OnInit {
  user: any;
  id: string;
  private sub: any;
  direction: any;
  placeClass: string;

  economyPlaces: any[] = [];
  firstPlaces: any[] = [];
  businessPlaces: any[] = [];

  placeChoosed: any;

  constructor(
    private route: ActivatedRoute,
    private raceService: RaceService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private location: Location
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.raceService.getRaceByPlacesCount(this.id)
        .subscribe(
          data => {
            this.direction = data;
            this.sortPlaces(this.direction.places);
            console.log(data);
          }
        );

    });

    this.userService.getUser()
      .subscribe(
        user => {
          console.log('user from service ', user);
          this.user = user;
        }
      );

    this.userService.updateUser();
  }

  choosePlace(place) {
    if (!place.available) return;
    this.placeChoosed = place;
  }

  enoughMoney() {
    if (!this.placeChoosed) return true;
    if (!this.user) return true;
    if (this.placeChoosed.price > this.user.money) {
      return false;
    } else {
      return true;
    }
  }

  sortPlaces(places) {
    console.log(places)
    for(let i = 0; i < places.length; i++) {
      switch (places[i].class) {
        case 'economy':
          this.economyPlaces.push(places[i]);
          break;
        case 'first':
          this.firstPlaces.push(places[i]);
          break;
        case 'business':
          this.businessPlaces.push(places[i]);
          break;
      }
    }

  }

  back() {
    this.location.back();
  }


  clear() {
    this.placeChoosed = null;
  }

  bookRace() {
    $('#exampleModalLong').modal('hide');
    console.log('this user ', this.user);
    console.log('this direction ', this.direction);
    this.raceService.bookPlace(this.placeChoosed, this.direction._id, this.user._id)
      .subscribe(
        data => {
          this.router.navigate(['profile']);
          this.userService.updateUser();
          this.alertService.success('Ви успішно забронювали ваш рейс!');
        },
        error => {
          this.alertService.error(error);
        }
      )
  }
}
