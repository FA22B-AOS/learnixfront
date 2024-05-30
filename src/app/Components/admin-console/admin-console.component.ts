import { Component } from '@angular/core';
import {HttpService} from "../../Services/http.service";
import {KeycloakUser} from "../../Models/KeycloakUser";
import {NgForOf} from "@angular/common";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-console',
  standalone: true,
  imports: [
    NgForOf,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './admin-console.component.html',
  styleUrl: './admin-console.component.css'
})
export class AdminConsoleComponent {

  constructor(private _http: HttpService, private http: HttpClient) {}
  users: KeycloakUser[] | undefined;
  firstName: string = "";
  lastName: string = "";
  newUsername: string = "";
  email: string = "";

  updateUsername: string = ""
  updateFirstName: string = "";
  updateLastName: string = "";
  updateEmail: string = "";


  ngOnInit() :void {
    this.GetAllUsers();
  }

  GetAllUsers() {
  this._http.GetKeycloakUsers().then((response) => {
    console.log(response);
    this.users = response;
    });
  }

  protected UpdateUser(username: string){
    let userData = {
      firstName: this.updateFirstName,
      lastName: this.updateLastName,
      email: this.updateEmail
    }

    this._http.GetId(username).then(result => {
      {
        this._http.UpdateKeyCloakUser(result[0].id, userData);
      }
    })
  }

  protected DeleteUser(userID: string){
    let userData = {
      id: userID,
    }
    this._http.DeleteKeycloakUser(userID, userData);
  }

  public CreateKeyCloakUser(): void{
    let body = {
      firstName: this.firstName ,
      lastName: this.lastName,
      email: this.email,
      enabled: true,
      username: this.newUsername
    }
    new Promise((resolve, reject) => {
      this.http.post('http://localhost:8080/admin/realms/learnix/users', body).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    }).then(result => {
      this._http.GetId(this.newUsername).then(result => {
        {
          this._http.SetTempPass(result[0].id).then();
        }
      })
    })
  }
}
