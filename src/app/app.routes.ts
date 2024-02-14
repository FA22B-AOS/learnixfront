import { Routes } from '@angular/router';
import {authGuard} from "./Services/auth.guard";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  { path:'test', component: AppComponent, canActivate: [authGuard]},
];
