import { Routes } from '@angular/router';
import {authGuard} from "./Services/auth.guard";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'test', component: AppComponent, canActivate: [authGuard]},
];
