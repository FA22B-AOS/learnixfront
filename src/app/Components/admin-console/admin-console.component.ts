import { Component } from '@angular/core';
import {HttpService} from "../../Services/http.service";
import {KeycloakUser} from "../../Models/KeycloakUser";
import {NgForOf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {resolve} from "@angular/compiler-cli";

@Component({
  selector: 'app-admin-console',
  standalone: true,
  imports: [
    NgForOf,
    HttpClientModule
  ],
  templateUrl: './admin-console.component.html',
  styleUrl: './admin-console.component.css'
})
export class AdminConsoleComponent {

  constructor(private _http: HttpService, private http: HttpClient) {}
  users: KeycloakUser[] | undefined;

  ngOnInit() :void {
    this.GetAllUsers();
  }

  GetAllUsers() {
  this._http.GetKeycloakUsers().then((response) => {
    console.log(response);
    this.users = response;
    });
  }

  protected UpdateUser(userID: string){
    //Beispiel
    let userData = {
      id: userID,
      firstName: 'Kek',
      lastName: 'Lord',
      email: 'kek@lord.xxx'
    }
    this._http.UpdateKeyCloakUser(userID,userData);
  }

  GetUserInfo($event: MouseEvent, userId: number) {
    this._http.GetUserInfo(userId).then((response) => {
      console.log(response);
      this.users = response;
    });
  }

  //protected readonly KeycloakUser = KeycloakUser;
  protected readonly alert = alert;
}
