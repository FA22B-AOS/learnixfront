import {Component, Input} from '@angular/core';
import {Workspace} from "../Models/Workspace";
import {HttpService} from "../Services/http.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-workspace-header',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './workspace-header.component.html',
  styleUrl: './workspace-header.component.css'
})
export class WorkspaceHeaderComponent {
  @Input() members: string[] = [];
  @Input() moderators: string[] = [];
  @Input() owner: string = '';
  @Input() workspace:  Workspace | undefined;
  inviteOnly: boolean = false;
  publicWorkspace: boolean = false;

  // constructor(private httpService: HttpService) {
  // }


  togglePublicWorkspace() {
    // if (this.workspace && this.owner) {
    //   this.httpService.setPublicWorkspace(this.workspace.workspaceId, !this.workspace.publicWorkspace)
    //     .subscribe(() => {
    //       this.workspace!.publicWorkspace = !this.workspace!.publicWorkspace;
    //     });
    // }
  }

   toggleInviteOnly() {
  //   if (this.workspace && this.owner) {
  //     this.httpService.setInviteOnly(this.workspace.workspaceId, !this.workspace.inviteOnly)
  //       .subscribe(() => {
  //         this.workspace!.inviteOnly = !this.workspace!.inviteOnly;
  //       });
  //   }
  }

}
