import {Component} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {WorkspaceHeaderComponent} from "../workspace-header/workspace-header.component";
import {ActivatedRoute} from "@angular/router";
import {Workspace} from "../../Models/Workspace";
import {WorkspaceService} from "../../Services/workspace.service";
import {HttpService} from "../../Services/http.service";

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
  workspace: Workspace | undefined;
  protected owner: boolean = false;

  constructor(private keycloakService: KeycloakService, private workspaceService: WorkspaceService, private http: HttpService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const workspaceId = this.route.snapshot.paramMap.get('workspaceId');
    if (workspaceId) {
      this.loadWorkspace(Number(workspaceId));
    }

    this.workspaceService.getWorkspace().subscribe(workspace => {
      console.log("WorkspaceView", workspace);
      this.workspace = workspace;
      this.checkOwnership();
    });
  }


  private checkOwnership() {
    const userId = this.keycloakService.getKeycloakInstance().subject;
    if (this.workspace && userId) {
      this.owner = this.workspace.ownerId === userId;
    }
  }

  loadWorkspace(workspaceId: number): void {
    console.log("loading workspace", workspaceId);
    this.http.getWorkspaceById(workspaceId).subscribe(
      (workspace) => {
        this.workspaceService.setWorkspace(workspace);
      },
      (error) => {
        console.error(error);
      }
    );

    this.workspaceService.getWorkspace();
  }
}
