import {Component, Input} from '@angular/core';
import {Workspace} from "../Models/Workspace";
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

  constructor(private keycloakService: KeycloakService) {
    this.checkOwnership();
  }


  private checkOwnership() {
    const userId = this.keycloakService.getKeycloakInstance().subject;
    if (this.workspace && userId) {
      this.owner = this.workspace.ownerId === userId;
    }
  }
}
