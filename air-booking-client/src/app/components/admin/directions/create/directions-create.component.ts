import { Component, OnInit } from '@angular/core';
import { countries } from '../../../../shared/countries';
import { Select2TemplateFunction, Select2OptionData } from 'ng2-select2';
import { RaceService } from "../../../../services/race.service";
import { AlertService } from "../../../../services/alert.service";
import { Router } from "@angular/router";
import {PlaneService} from "../../../../services/plane.service";

declare var jQuery;

@Component({
  selector: 'app-directions-create',
  templateUrl: 'directions-create.component.html',
  styleUrls: ['directions-create.component.css']
})
export class DirectionsCreateComponent implements OnInit {
  direction: any;
  countriesArray: Array<Select2OptionData>;
  directionsSameError: Boolean = false;
  minDate: Date = new Date();

  planes: any[];

  options = {
    templateResult: this.templateResult,
    templateSelection: this.templateSelection
  };


  constructor(
    private raceService: RaceService,
    private planeService: PlaneService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.planeService.getAll()
      .subscribe(
        planes => {
          this.planes = this.planesToOptionData(planes);
          if (this.planes.length) {
            this.direction.planeId = this.planes[0].id
          }
        }
      );

    this.countriesArray = countries;
    this.direction = {
      from: {
        city: '',
        country: this.countriesArray[0].text,
        country_ISO: this.countriesArray[0].id,
        time: new Date(),
        date: new Date()
      },
      to: {
        city: '',
        country: this.countriesArray[1].text,
        country_ISO: this.countriesArray[1].id,
        time: new Date(),
        date: new Date()
      }
    };
    this.minDate.setDate(this.minDate.getDate() + 1);
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

  private filterCountriesById(id: any) {
    return this.countriesArray.filter((country: any) => {
      return country.id === id.value
    })[0];
  }

  planesToOptionData(planes) {
    let options = planes.map((plane) => {
      plane.id = plane._id;
      plane.additional = { image:  plane.photoUrl };
      plane.text = plane.serialId + ' ' + plane.brand + ' ' + plane.model

      delete plane._id;
      delete plane.photoUrl;

      return plane
    });
    console.log(options)
    return options;
  }

  planeChanged(planeId: any) {
    this.direction.planeId = planeId.value;
  }

  private isSameDestination() {
    if (this.direction.from.country === this.direction.to.country &&
        this.direction.from.city === this.direction.to.city) {
      this.directionsSameError = true;
      return true
    } else {
      this.directionsSameError = false;
      return false;
    }
  }

  public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    let image = '<span class="image"></span>';
    console.log('STATE ', state);
    if (state.additional.image) {
      image = '<span class="image"><img src="' + state.additional.image + '"</span>';
    }
    console.log('<span><b>' + state.text + '.</b> ' + image  + '</span>');
    return jQuery('<span><b>' + state.text + '.</b> ' + image  + '</span>');
  }

  // function for selection template
  public templateSelection: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    this.direction.planeId = state.id;
    console.log(this.direction);

    return jQuery('<span><b>' + state.text + '</span>');
  }

  private onSuccess(race: any) {
    this.alertService.success('Race ' + race._id + ' was successfully created!');
    this.router.navigate(['admin', 'directions', 'view']);
  }

  create(form: any) {
    console.log(this.direction)
    if (!this.isSameDestination()) {
      this.raceService.create(this.direction).subscribe(
        data => {
          this.onSuccess(data);
        },
        error => {
          this.alertService.error(error);
        }
      );
    }
  }
}
