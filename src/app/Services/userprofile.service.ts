import { Injectable } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  public firstName: string | undefined;
  public lastName: string | undefined;
  private keycloakBaseUrl: string = 'http://localhost:8080';
  private realm: string = 'learnix';
  private accessToken: string = ''; // The access token you obtained
  constructor(private keycloak: KeycloakService,private http: HttpClient) {
    this.keycloak.loadUserProfile().then(profile => {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
    });

  }

  updateProfile(firstName: string, lastName: string): Observable<any> {

    this.keycloak.getToken().then(result => this.accessToken = result);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`    });
    const body = {
      firstName: firstName,
      lastName: lastName
    };

    return this.http.put(`${this.keycloakBaseUrl}/realms/${this.realm}/account`, body, { headers: headers });
  }


}
