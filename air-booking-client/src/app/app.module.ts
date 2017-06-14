import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Select2Module } from 'ng2-select2';
import { Select2Component } from 'ng2-select2/ng2-select2';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import { MomentModule } from 'angular2-moment';

import { appRoutes } from './app.routing';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TicketBookingComponent } from './components/ticket-booking/ticket-booking/ticket-booking.component';
import { AirVideoComponent } from './components/air-video/air-video.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from "./services/alert.service";
import { AuthenticationService } from "./services/authentication.service";
import { UserService } from "./services/user.service";
import { AuthGuard } from "./guards/auth.guard";
import { MenuComponent } from './components/admin/menu/menu.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { DirectionsComponent } from './components/admin/directions/directions.component';
import { DirectionsViewComponent } from './components/admin/directions/view/directions-view.component';
import { DirectionsCreateComponent } from './components/admin/directions/create/directions-create.component';
import { RaceService } from "./services/race.service";
import { DirectionsEditComponent } from './components/admin/directions/edit/directions-edit.component';
import { BookPlaceComponent } from './components/ticket-booking/book-place/book-place.component';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
import { ViewAllRacesComponent } from './components/ticket-booking/view-all-races/view-all-races.component';
import { BookingComponent } from './components/ticket-booking/booking.component';
import { CreatePlaneComponent } from './components/admin/planes/create/create-plane.component';
import { PlaneService } from "./services/plane.service";
import { ViewPlaneComponent } from './components/view-plane/view-plane.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    TicketBookingComponent,
    AirVideoComponent,
    PricingComponent,
    PageNotFoundComponent,
    AlertComponent,
    ProfileComponent,
    Select2Component,
    MenuComponent,
    AdminPanelComponent,
    DirectionsComponent,
    DirectionsViewComponent,
    DirectionsCreateComponent,
    DirectionsEditComponent,
    BookPlaceComponent,
    TicketCardComponent,
    ViewAllRacesComponent,
    BookingComponent,
    CreatePlaneComponent,
    ViewPlaneComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    MomentModule
  ],
  providers: [
    AuthGuard,
    UserService,
    RaceService,
    PlaneService,
    AlertService,
    AuthenticationService,
    Select2Module
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
