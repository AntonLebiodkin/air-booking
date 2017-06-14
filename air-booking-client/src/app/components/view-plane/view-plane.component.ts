import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PlaneService} from "../../services/plane.service";

@Component({
  selector: 'app-view-plane',
  templateUrl: './view-plane.component.html',
  styleUrls: ['./view-plane.component.css']
})
export class ViewPlaneComponent implements OnInit {
  @Input() plane: any;

  constructor(private planeService: PlaneService, private location: Location) { }

  ngOnInit() {
    this.plane = this.planeService.getCurrentPlane();
  }

  goBack() {
    this.location.back();
  }

}
