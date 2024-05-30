import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {KeycloakService} from "keycloak-angular";

export const authGuard: CanActivateFn = (route, state) => {

  const keycloak = inject(KeycloakService);
  if (keycloak.isLoggedIn()) {
    return true; // Der Benutzer ist bereits angemeldet
  } else {
    // Der Benutzer ist nicht angemeldet, leite ihn zu Keycloak weiter
    keycloak.login({redirectUri: window.location.origin + '/' + route.url.join('/')});
    return false;
  }

}
  export const authGuardAdmin: CanActivateFn = (route, state) => {

  const keycloak = inject(KeycloakService);
  if (keycloak.isLoggedIn()) {
    if (keycloak.isUserInRole("admin")) { return true}
    return inject(Router).parseUrl("/home"); // Der Benutzer ist bereits angemeldet
  }
  else {
    // Der Benutzer ist nicht angemeldet, leite ihn zu Keycloak weiter
    keycloak.login({redirectUri: window.location.origin+'/'+route.url.join('/')});
    return false;
  }
};
