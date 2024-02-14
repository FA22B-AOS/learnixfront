import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),importProvidersFrom(KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
  ]
};

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<any> {
  return () =>
    keycloak.init({
      config: {
        url: ' http://localhost:8080/',
        realm: 'master',
        clientId: 'account',
      },
      initOptions: {
        onLoad: 'check-sso', //login-required auch möglich, führt zum Login-Zwang beim Aufruf der Startseite
        checkLoginIframe: false,
        checkLoginIframeInterval: 25
      },
      enableBearerInterceptor: true,
    });
}
