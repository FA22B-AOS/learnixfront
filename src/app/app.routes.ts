import { Routes } from '@angular/router';
import {LectionComponent} from "./Components/lection/lection.component";
import {LandingpageComponent} from "./Components/landingpage/landingpage.component";
import {ChapterComponent} from "./Components/lection/chapter/chapter.component";
import {PageNotFoundComponent} from "./Components/page-not-found/page-not-found.component";
import {authGuard} from "./auth.guard";
import {LectionlistComponent} from "./Components/lectionlist/lectionlist.component";
import {UserprofileComponent} from "./Components/userprofile/userprofile.component";
import {PrivacyPolicyComponent} from "./Components/privacy-policy/privacy-policy.component";
import {TermsOfServiceComponent} from "./Components/terms-of-service/terms-of-service.component";
import {SidebarComponent} from "./Components/sidebar/sidebar.component";

export const routes: Routes = [
  { path: '', component: LandingpageComponent},
  { path: 'learning', component: SidebarComponent, canActivate: [authGuard],
    children: [
      { path: 'profile', component: UserprofileComponent, canActivate: [authGuard]},
      { path: 'lectionlist', component: LectionlistComponent,canActivate: [authGuard]},
      { path: 'mylections', component: LectionlistComponent,canActivate: [authGuard]},
      { path: 'newLection', component: LectionComponent,canActivate: [authGuard]},
      { path: 'lection/:lectionId', component: LectionComponent,canActivate: [authGuard]},
      { path: 'lection/:lectionId/:chapterId', component: ChapterComponent,canActivate: [authGuard]},
    ]
  },
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'terms-of-service', component: TermsOfServiceComponent},
  { path: '**', component: PageNotFoundComponent},
];
