import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { User } from "../../models/user";
import { Subject, Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import {AlertService} from "../../services/alert.service";

declare var $;

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  private userSubscription: Subscription;

  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.userSubscription = this.userService.getUser()
      .subscribe(
        user => {
          console.log('GOT USER IN HEADER!' , user);
          this.user = user
        },
        error => {
          this.alertService.error(error);
        }
      );
    this.userService.updateUser();
  }

  userLoggenIn() {
    return this.authenticationService.loggedIn();
  }

  addMoney(amount: number) {
    $('#addCreditsModal').modal('hide');
    this.userService.addMoney(this.user._id, amount)
      .subscribe();
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


}
