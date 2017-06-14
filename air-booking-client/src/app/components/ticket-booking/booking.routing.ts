import { Routes } from "@angular/router";
import { BookPlaceComponent } from "./book-place/book-place.component";
import { ViewAllRacesComponent } from "./view-all-races/view-all-races.component";
import { TicketBookingComponent } from "./ticket-booking/ticket-booking.component";

export const bookingRoutes: Routes = [
  { path: '', component: TicketBookingComponent },
  { path: 'buy/:id', component: BookPlaceComponent },
  { path: 'all', component: ViewAllRacesComponent }
];
