import {Component, Input} from '@angular/core';
import {Workspace} from "../../Models/Workspace";

import {AsyncPipe, NgForOf} from "@angular/common";
import {Observable} from "rxjs";
import {WorkspaceJoinRequest} from "../../Models/WorkspaceJoinRequest";
import {HttpService} from "../../Services/http.service";
import {WorkspaceService} from "../../Services/workspace.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-workspace-header',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './workspace-header.component.html',
  styleUrl: './workspace-header.component.css'
})
export class WorkspaceHeaderComponent {
  members: string[] | undefined;
  moderators: string[] | undefined;
  requests: Observable<WorkspaceJoinRequest[]> | undefined;
  currentRequests: WorkspaceJoinRequest[] = [];
  @Input() owner: boolean = false;
  workspace:  Workspace | undefined;
  inviteOnly: boolean = false;
  publicWorkspace: boolean = false;
  @Input() searchbarOnly  = false;
  newWorkspaceTitle: string = '';

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
        this.requests.subscribe(requests => {
          this.currentRequests = requests;
        });
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
        this.currentRequests = this.currentRequests.filter(request => request.requestId !== requestId);
      }
    ).catch(error => {
      console.error("Error accepting request:", error);
    });
  }

  denyRequest(requestId: number) {
    console.log("Reguest denied:", requestId);
    this.httpService.denyWorkspaceJoinRequest(requestId).then(
      () => {
        this.currentRequests = this.currentRequests.filter(request => request.requestId !== requestId);
      }
    ).catch(error => {
      console.error("Error accepting request:", error);
    });
  }

  removeMod(moderatorId: string) {
    console.log("Reguest removed:", moderatorId);
  }

  createWorkspace(): void {
    if (this.newWorkspaceTitle.trim()) {
      // Implement your workspace creation logic here, for example:
      this.httpService.createWorkspace({ title: this.newWorkspaceTitle }).subscribe(response => {
        console.log('Workspace created:', response);
        // Refresh the workspaces list
        alert("Workspace: " + response.title + "created successfully.");
      }, error => {
        console.error('Error creating workspace:', error);
        alert("Error creating workspace:" + error);
      });
      // Clear the input field after creating the workspace
      this.newWorkspaceTitle = '';
    } else {
      alert('Please enter a title for the workspace.');
    }
  }


}
