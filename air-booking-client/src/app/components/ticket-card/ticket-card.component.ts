import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent implements OnInit {
  @Input() ticket: any;

  constructor() { }

  ngOnInit() {
  }

}
