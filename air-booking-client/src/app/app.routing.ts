import { Routes } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AirVideoComponent } from './components/air-video/air-video.component';
import { PricingComponent } from "./components/pricing/pricing.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { TicketBookingComponent } from "./components/ticket-booking/ticket-booking/ticket-booking.component";
import { AdminPanelComponent } from "./components/admin/admin-panel/admin-panel.component";
import { BookPlaceComponent } from "./components/ticket-booking/book-place/book-place.component";
import { adminRoutes } from "./components/admin/admin.routing";
import { bookingRoutes } from "./components/ticket-booking/booking.routing";
import { BookingComponent } from "./components/ticket-booking/booking.component";
import {ViewPlaneComponent} from "./components/view-plane/view-plane.component";

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'booking', component: BookingComponent, children: bookingRoutes },
  { path: 'plane/view/:_id', component: ViewPlaneComponent },
  { path: 'admin', component: AdminPanelComponent, children: adminRoutes },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', component: AirVideoComponent },
  { path: '**', component: PageNotFoundComponent }
];
