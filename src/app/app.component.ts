import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from "./Components/sidebar/sidebar.component";
import {KeycloakService} from "keycloak-angular";
import {LandingpageComponent} from "./Components/landingpage/landingpage.component";
import {HeaderComponent} from "./Components/landingpage/Content/header/header.component";
import {FooterComponent} from "./Components/landingpage/Content/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, LandingpageComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Learnix';

  constructor(protected keycloakService: KeycloakService) {
  }
}
