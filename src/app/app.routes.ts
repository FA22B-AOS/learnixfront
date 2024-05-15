import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LectionComponent} from "./Components/lection/lection.component";
import {LandingpageComponent} from "./Components/landingpage/landingpage.component";
import {ChapterComponent} from "./Components/lection/chapter/chapter.component";
import {PageNotFoundComponent} from "./Components/page-not-found/page-not-found.component";
import {authGuard} from "./auth.guard";

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [authGuard]},
  { path: 'lections', component: LandingpageComponent, canActivate: [authGuard]},
  { path: 'lection/:lectionId', component: LectionComponent, canActivate: [authGuard]},
  { path: 'lection/:lectionId/:chapterId', component: ChapterComponent, canActivate: [authGuard]},
  { path: '**', component: PageNotFoundComponent},
];
