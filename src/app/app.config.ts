import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
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
  // Keycloak überspringen im DevMode -> Production aktivieren in main.ts
  if (!isDevMode()){
    return () =>
      keycloak.init({
        config: {
          url: ' https://keycloak.szut.dev/auth',
          realm: 'szut',
          clientId: 'employee-management-service-frontend',
        },
        initOptions: {
          onLoad: 'check-sso', //login-required auch möglich, führt zum Login-Zwang beim Aufruf der Startseite
          checkLoginIframe: false,
          checkLoginIframeInterval: 25
        },
        enableBearerInterceptor: true,
      });
  } else {
    return () => Promise.resolve(true);
  }
}


