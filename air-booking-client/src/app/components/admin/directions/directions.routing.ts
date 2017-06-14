import {Routes} from "@angular/router";
import { DirectionsViewComponent } from "./view/directions-view.component";
import { PageNotFoundComponent } from "../../page-not-found/page-not-found.component";
import { DirectionsCreateComponent } from "./create/directions-create.component";
import { DirectionsEditComponent } from "./edit/directions-edit.component";
import { CreatePlaneComponent } from "../planes/create/create-plane.component";

export const directionsRoutes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'edit/:id', component: DirectionsEditComponent },
  { path: 'view', component: DirectionsViewComponent },
  { path: 'plane/create', component: CreatePlaneComponent },
  { path: 'create', component: DirectionsCreateComponent },
  { path: '**', component: PageNotFoundComponent }
];
