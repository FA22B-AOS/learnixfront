import { Component } from '@angular/core';
import {UserprofileService} from "../../Services/userprofile.service";

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {

  protected firstName : string  | undefined;
  protected lastName : string | undefined;

  constructor(private userProfileService: UserprofileService) {
    this.lastName = this.userProfileService.lastName;
    this.firstName = this.userProfileService.firstName;

  }

  public UpdateProfile() {


    if (typeof this.firstName === "string" && typeof this.lastName === "string" ) {

      this.userProfileService.updateProfile(this.firstName, this.lastName).subscribe({
        next: (response) => {
          console.log('Profile updated successfully', response);
        },
        error: (error) => {
          console.error('Error updating profile', error);
        }
      });

    }
  }

}
