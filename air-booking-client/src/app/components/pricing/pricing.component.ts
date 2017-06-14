import { Component, OnInit } from '@angular/core';

declare var Flickity: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  flickity: any;
  constructor() { }

  ngOnInit() {
    this.flickity = new Flickity('.pricing', {
      cellAlign: 'left',
      contain: true
    });
  }

}
