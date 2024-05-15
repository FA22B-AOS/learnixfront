import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {HttpService} from "../../Services/http.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {ImageCroppedEvent, ImageCropperModule} from 'ngx-image-cropper';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ImageCropperModule,
  ],
  providers: [HttpService],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  tempCroppedImage: any = '';

  protected username: string | undefined;
  //protected email: string | undefined;
  protected roles: string[] | undefined;
  //protected profilePicture: File = null;

  constructor(private keycloak: KeycloakService, private httpService: HttpService) {
    this.username = this.keycloak.getUsername();
    this.roles = this.keycloak.getUserRoles();
    //this.email = this.keycloak.
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  onCrop(event: ImageCroppedEvent) {
    this.tempCroppedImage = event.base64;
  }

  applyCroppedImage() {
    this.croppedImage = this.tempCroppedImage;
  }

}
