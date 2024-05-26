import {Component, Input} from '@angular/core';
import {Workspace} from "../Models/Workspace";
import {HttpService} from "../Services/http.service";
import {KeycloakService} from "keycloak-angular";
import {WorkspaceHeaderComponent} from "../workspace-header/workspace-header.component";

@Component({
  selector: 'app-workspace-view',
  standalone: true,
  imports: [
    WorkspaceHeaderComponent
  ],
  templateUrl: './workspace-view.component.html',
  styleUrl: './workspace-view.component.css'
})
export class WorkspaceViewComponent {
  @Input() workspace: Workspace | undefined;
  protected owner: boolean = false;

  constructor(private httpService: HttpService, private keycloakService: KeycloakService) {
    this.checkOwnership();
  }

  private checkOwnership() {
    const userId = this.keycloakService.getKeycloakInstance().subject;
    if (this.workspace && userId) {
      this.owner = this.workspace.ownerId === userId;
    }
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
}
