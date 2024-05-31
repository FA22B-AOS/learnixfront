import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {

  constructor(private keycloakService: KeycloakService) {
  }

  login(){
    this.keycloakService.login();
  }

}
