import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaneService } from "../../../../services/plane.service";
import { AlertService } from "../../../../services/alert.service";

@Component({
  selector: 'app-create-plane',
  templateUrl: './create-plane.component.html',
  styleUrls: ['./create-plane.component.css']
})
export class CreatePlaneComponent implements OnInit {
  plane: any = {};

  constructor(private planeService: PlaneService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
  }

  create() {
    this.planeService.create(this.plane)
      .subscribe(
        data => {
          this.router.navigate(['admin', 'directions']);
          this.alertService.success('Літак був створений успішно!');
        },
        error => {
          this.alertService.error(error);
        }
      )
  }

}
