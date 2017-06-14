import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from "../../../services/alert.service";
import { RaceService } from "../../../services/race.service";
import {PlaneService} from "../../../services/plane.service";

declare var $;

@Component({
  selector: 'app-view-all-races',
  templateUrl: './view-all-races.component.html',
  styleUrls: ['./view-all-races.component.css']
})
export class ViewAllRacesComponent implements OnInit {
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Дата відправлення', name: 'from.time'},
    {title: 'Літак', name: 'planeTemplate' },
    {title: 'Місце відправлення', name: 'from.place', filtering: {filterString: '', placeholder: 'Фільтрувати за країною відправлення'}},
    {title: 'Дата прибуття', name: 'to.time'},
    {title: 'Місце прибуття', name: 'to.place', filtering: {filterString: '', placeholder: 'Фільтрувати за країною відправлення'}},
    {title: 'К-ть вільних місць', name: 'placesLeft'},
    {title: 'Бронювання', name: 'actionBuy'}
  ];

  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  private raceSelectedId: any;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any> = [];

  public constructor(private raceService: RaceService, private alertService: AlertService, private router: Router, private planeService: PlaneService) {

  }

  public ngOnInit():void {
    this.raceService.getAll()
      .subscribe(
        data => {
          this.data = this.appendFullPlaceName(data);
          this.length = this.data.length;
          this.onChangeTable(this.config);
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }

  public findRaceIndexInArrayById(_id: string) {
    let index = -1;
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i]._id === _id) {
        index = i;
        break;
      }
    }
    return index;
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public appendFullPlaceName(data: any[]) {
    for (let i = 0; i < data.length; i++) {
      //FROM
      data[i].from.time = this.dateConverter(new Date(data[i].from.time));
      data[i].from.place = data[i].from.city + ', ' + data[i].from.country;
      //TO
      data[i].to.time = this.dateConverter(new Date(data[i].to.time));
      data[i].to.place = data[i].to.city + ', ' + data[i].to.country;

      data[i].economyCount = 0;
      data[i].firstCount = 0;
      data[i].businessCount = 0;

      data[i].actionBuy = '<button class="btn btn-warning edit" (click)="bookRace()">Забронювати</button>';

      if (data[i].plane) {
        data[i].planeTemplate = `<p>${data[i].plane.serialId}</p><img class="plane-small" style="width: 100px;" src='${data[i].plane.photoUrl}'>`
      } else {
        data[i].planeTemplate = '';
      }
    }
    return data
  }

  public deleteRace() {
    this.raceService.delete(this.raceSelectedId).subscribe();
    $('#exampleModalLong').modal('hide');
    let indexToDelete = this.findRaceIndexInArrayById(this.raceSelectedId);
    this.rows.splice(indexToDelete, 1);
    this.alertService.success('Race ' + this.raceSelectedId + ' was deleted successfully!');
    this.raceSelectedId = '';
  }

  public editRace() {
    this.router.navigate(['admin', 'directions', 'edit', this.raceSelectedId]);
  }

  private dateConverter(today: Date): string {
    var day = today.getDate() + "";
    var month = (today.getMonth() + 1) + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    minutes = checkZero(minutes);
    seconds = checkZero(seconds);

    return day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;

    function checkZero(data){
      if(data.length == 1){
        data = "0" + data;
      }
      return data;
    }
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }
    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }
    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return this.ObjectByString(item, column.name).match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        this.ObjectByString(item, config.filtering.columnName).match(this.config.filtering.filterString));
      // item[config.filtering.columnName]
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (this.ObjectByString(item, column.name).toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    this.raceSelectedId = data.row._id;
    if (data.column === 'actionBuy'){
      this.buy();
    }

    if (data.column === 'planeTemplate') {
      console.log('CLICKED YES!')
      console.log(data);
      this.planeService.setCurrentPlane(data.row.plane);
      console.log(this.planeService.getCurrentPlane());
      this.router.navigate([`/plane/view/${data.row.plane._id}`]);
    }
  }

  ObjectByString(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o || "";
  }

  buy() {
    console.log('buy!!!');
    this.router.navigate(['booking', 'buy', this.raceSelectedId])
  }
}
