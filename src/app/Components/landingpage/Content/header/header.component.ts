import { Component } from '@angular/core';
import {NavigationComponent} from "../navigation/navigation.component";
import {KeycloakService} from "keycloak-angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavigationComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(protected  keycloak: KeycloakService) {
  }

  login() {
    this.keycloak.login();
  }

}
