import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RaceService } from "../../../../services/race.service";
import { countries } from "../../../../shared/countries";
import { Select2OptionData } from "ng2-select2";
import {AlertService} from "../../../../services/alert.service";

@Component({
  selector: 'app-edit',
  templateUrl: './directions-edit.component.html',
  styleUrls: ['./directions-edit.component.css']
})
export class DirectionsEditComponent implements OnInit {
  id: string;
  private sub: any;
  direction: any;
  countriesArray: Array<Select2OptionData>;


  constructor(private route: ActivatedRoute, private raceService: RaceService, private router: Router, private alertService: AlertService) {}

  ngOnInit() {
    this.countriesArray = countries;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.raceService.getById(this.id)
        .subscribe(
          data => {
            console.log('GOT RACE TO EDIT!');
            this.direction = this.updateTime(data);
            console.log(data);
          }
        )
    });
  }

  private filterCountriesById(id: any) {
    return this.countriesArray.filter((country: any) => {
      return country.id === id.value
    })[0];
  }

  private fromChanged(selectedCountry: any) {
    console.log(selectedCountry);
    let country = this.filterCountriesById(selectedCountry);
    this.direction.from.country = country.text;
    this.direction.from.country_ISO = selectedCountry.value;
  }

  private toChanged(selectedCountry: any) {
    console.log(selectedCountry);
    let country = this.filterCountriesById(selectedCountry);
    this.direction.to.country = country.text;
    this.direction.to.country_ISO = selectedCountry.value;
  }

  update() {
    this.raceService.update(this.direction)
      .subscribe(
        data => {
          this.router.navigate(['admin', 'directions', 'view']);
          this.alertService.success('Race has been updated!');
        },
        error => {
          this.alertService.error('Error while creating race: ', error);
        }
      )
  }

  updateTime(direction) {
    delete direction.from.time;
    delete direction.to.time;
    console.log(direction);
    return direction;
  }

  cancel() {
    this.router.navigate(['admin', 'directions', 'view'])
  }

}
