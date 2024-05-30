import {Component, Input} from '@angular/core';
import {Workspace} from "../Models/Workspace";
import {HttpService} from "../Services/http.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Observable, of} from "rxjs";
import {WorkspaceService} from "../Services/workspace.service";
import {WorkspaceJoinRequest} from "../Models/WorkspaceJoinRequest";

@Component({
  selector: 'app-workspace-header',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './workspace-header.component.html',
  styleUrl: './workspace-header.component.css'
})
export class WorkspaceHeaderComponent {
  members: string[] | undefined;
  moderators: string[] | undefined;
  requests: Observable<WorkspaceJoinRequest[]> | undefined;
  @Input() owner: boolean = false;
  workspace:  Workspace | undefined;
  inviteOnly: boolean = false;
  publicWorkspace: boolean = false;
  @Input() searchbarOnly  = false;

  constructor(private httpService: HttpService, private workspaceService: WorkspaceService) {
  }

  ngOnInit():void{
    this.workspaceService.getWorkspace().subscribe(workspace => {
      console.log("Workspace", workspace);
      this.workspace = workspace;
      if (this.workspace){
        this.fillModeratorList();
        this.fillMemberList();
        this.requests = this.httpService.getWorkspaceJoinRequests(this.workspace.workspaceId);
        console.log(this.requests);
      }


    });
  }


  togglePublicWorkspace() {
    if (this.workspace && this.owner) {
      this.httpService.setPublicWorkspace(this.workspace.workspaceId, !this.workspace.publicWorkspace)
        .subscribe(() => {
          this.workspace!.publicWorkspace = !this.workspace!.publicWorkspace;
        });
    }
  }

  toggleInviteOnly() {
    if (this.workspace && this.owner) {
      this.httpService.setInviteOnly(this.workspace.workspaceId, !this.workspace.inviteOnly)
        .subscribe(() => {
          this.workspace!.inviteOnly = !this.workspace!.inviteOnly;
        });
    }
  }

  fillMemberList() {
    this.members = this.workspace?.memberIds;
    console.log("Members", this.members);
    //Abfrage von Userdata fehlt
  }

  fillModeratorList() {
    this.moderators = this.workspace?.moderatorIds;
    console.log("Mods",this.moderators);
    //Abfrage von Userdaten fehlt
  }

  approveRequest(requestId: number, requesterId: string) {
    console.log("Request approved:", requestId);
    this.httpService.acceptWorkspaceJoinRequest(requestId).then(
      () => {
        console.log("Request accepted successfully.");
        if (this.workspace) {
          this.workspace.memberIds.push(requesterId);
        }
      }
    ).catch(error => {
      console.error("Error accepting request:", error);
      // Handle error if needed
    });
  }

  denyRequest(requestId: number) {
    console.log("Reguest denied:", requestId);
  }

  removeMod(moderatorId: string) {
    console.log("Reguest removed:", moderatorId);
  }


}