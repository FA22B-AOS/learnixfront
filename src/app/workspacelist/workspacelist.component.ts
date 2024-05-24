import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {WorkspacecardComponent} from "../workspacecard/workspacecard.component";
import {catchError, forkJoin, map, Observable, of} from "rxjs";
import {HttpService} from "../Services/http.service";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {Workspace} from "../Models/Workspace";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LektioncardComponent} from "../Components/lektioncard/lektioncard.component";

@Component({
  selector: 'app-workspacelist',
  standalone: true,
  imports: [
    WorkspacecardComponent,
    AsyncPipe,
    FormsModule,
    LektioncardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './workspacelist.component.html',
  styleUrl: './workspacelist.component.css'
})
export class WorkspacelistComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef | undefined;
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
    console.log(this.UserGUID);
    this.fetchData();
  }

  private fetchData(): void {
    // this.workspaces$ = this.httpService.getAllWorkspaces();
    // this.workspaces$.subscribe(workspaces => {
    //   console.log('Fetched workspaces:', workspaces);
    // });
    // this.myWorkspaces$ = this.httpService.getMemberWorkspaces(this.UserGUID);

    if (this.UserGUID) {
      this.myWorkspaces$ = this.httpService.getMemberWorkspaces(this.UserGUID).pipe(
        map(workspaces => {
          console.log('Member Workspaces:', workspaces);
          return workspaces.map(workspace => new Workspace(
            workspace.workspaceId,
            workspace.title,
            workspace.ownerId,
            workspace.memberIds
          ));
        }),
        catchError(() => of([]))  // Fallback to empty array on error
      );

      this.workspaces$ = this.httpService.getAllWorkspaces().pipe(
        map(workspaces => {
          return workspaces.map(workspace => new Workspace(
            workspace.workspaceId,
            workspace.title,
            workspace.ownerId,
            workspace.memberIds
          ));
        }),
        catchError(() => of([]))  // Fallback to empty array on error
      );

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

