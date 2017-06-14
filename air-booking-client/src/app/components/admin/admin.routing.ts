import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { directionsRoutes } from './directions/directions.routing';
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {DirectionsViewComponent} from "./directions/view/directions-view.component";
import {DirectionsComponent} from "./directions/directions.component";

export const adminRoutes: Routes = [
  { path: '', redirectTo: 'directions', pathMatch: 'full'  },
  { path: 'directions', component: DirectionsComponent, children: directionsRoutes },
  // { path: 'register', component: RegisterComponent },
  // { path: 'pricing', component: PricingComponent },

];
