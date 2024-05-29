import { Component } from '@angular/core';
import {HttpService} from "../../Services/http.service";
import {KeycloakUser} from "../../Models/KeycloakUser";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-admin-console',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './admin-console.component.html',
  styleUrl: './admin-console.component.css'
})
export class AdminConsoleComponent {

  constructor(private _http: HttpService) {}
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

  GetUserInfo($event: MouseEvent, userId: number) {
    this._http.GetUserInfo(userId).then((response) => {
      console.log(response);
      this.users = response;
    });
  }

  //protected readonly KeycloakUser = KeycloakUser;
}
