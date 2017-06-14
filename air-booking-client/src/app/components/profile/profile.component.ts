import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import { TicketCardComponent } from "../ticket-card/ticket-card.component";
import {User} from "../../models/user";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  tickets: any[];
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.getTickets();
      });
    this.userService.updateUser();

  }

  getTickets() {
    this.userService.getTicketsByUserId(this.user._id)
      .subscribe(
        data => {
          console.log('TICKETS ', data);
          this.tickets = data;
        }
      );
  }

}
