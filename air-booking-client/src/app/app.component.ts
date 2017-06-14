import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AirVideoComponent } from './components/air-video/air-video.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
