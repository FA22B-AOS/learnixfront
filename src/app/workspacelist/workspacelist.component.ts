import {Component} from '@angular/core';
import {WorkspacecardComponent} from "../workspacecard/workspacecard.component";
import {forkJoin, map, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {Workspace} from "../Models/Workspace";
import {CommonModule} from "@angular/common";
import {HttpService} from "../Services/http.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-workspacelist',
  standalone: true,
  imports: [
    WorkspacecardComponent,
    CommonModule,
    HttpClientModule
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

  constructor(private httpService: HttpService, private router: Router, private keycloak: KeycloakService) {
    this.workspaces$ = of([]);
    this.myWorkspaces$ = of([]);
    this.nonMemberWorkspaces$ = of ([]);
    this.privateList = this.router.url === '/myworkspaces';
    this.UserGUID = this.keycloak.getKeycloakInstance().subject;
    this.fetchData();
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
            !memberWorkspaces.some(memberWorkspace => memberWorkspace.workspaceId === workspace.workspaceId)
          );
        })
      );
    } else {
      this.nonMemberWorkspaces$ = this.httpService.getAllWorkspaces();
    }
  }
}

