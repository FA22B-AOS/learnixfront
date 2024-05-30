import {Component} from '@angular/core';
import {WorkspacecardComponent} from "../workspacecard/workspacecard.component";
import {forkJoin, map, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

import {CommonModule} from "@angular/common";

import {HttpClientModule} from "@angular/common/http";

import {WorkspaceHeaderComponent} from "../workspace-header/workspace-header.component";
import {HeaderComponent} from "../landingpage/Content/header/header.component";
import {Workspace} from "../../Models/Workspace";
import {HttpService} from "../../Services/http.service";
import {WorkspaceService} from "../../Services/workspace.service";

@Component({
  selector: 'app-workspacelist',
  standalone: true,
  imports: [
    WorkspacecardComponent,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    WorkspaceHeaderComponent
  ],
  templateUrl: './workspacelist.component.html',
  styleUrl: './workspacelist.component.css'
})
export class WorkspacelistComponent {
  protected workspaces$: Observable<Workspace[]>;
  protected myWorkspaces$: Observable<Workspace[]>;
  protected nonMemberWorkspaces$: Observable<Workspace[]>;
  protected privateList: boolean = false;
  private readonly UserGUID: string | undefined;
  requestStatus: string | null = null;

  constructor(private httpService: HttpService, private router: Router, private keycloak: KeycloakService, private workspaceService: WorkspaceService) {
    this.workspaces$ = of([]);
    this.myWorkspaces$ = of([]);
    this.nonMemberWorkspaces$ = of ([]);
    this.privateList = this.router.url === '/myworkspaces';
    this.UserGUID = this.keycloak.getKeycloakInstance().subject;
    this.fetchData();
  }

  ngOnInit(): void {
    this.workspaceService.resetWorkspace();
  }

  private fetchData(): void {

    if (this.UserGUID) {

      this.myWorkspaces$ = this.httpService.getMemberWorkspaces();

      this.workspaces$ = this.httpService.getAllWorkspaces();

      this.nonMemberWorkspaces$ = forkJoin([this.workspaces$, this.myWorkspaces$]).pipe(
        map(([allWorkspaces, memberWorkspaces]) => {
          if (!memberWorkspaces) {
            memberWorkspaces = [];
          }
          return allWorkspaces.filter(workspace =>
            !memberWorkspaces.some(memberWorkspace => memberWorkspace.workspaceId === workspace.workspaceId) &&
            workspace.ownerId !== this.UserGUID
          );
        })
      );
    } else {
      this.nonMemberWorkspaces$ = this.httpService.getAllWorkspaces();
    }
  }

  handleRequestResult(status: string) {
    this.requestStatus = status;
  }
}

