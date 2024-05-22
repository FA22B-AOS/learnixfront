import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {WorkspacecardComponent} from "../workspacecard/workspacecard.component";
import {Observable, of} from "rxjs";
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
  protected privateList: boolean = false;
  private readonly UserGUID: string | undefined;

  constructor(private httpService: HttpService, private router: Router, private keycloak: KeycloakService) {
    this.workspaces$ = of([]);
    this.privateList = this.router.url === '/myworkspaces';
    this.UserGUID = this.keycloak.getKeycloakInstance().subject;
    this.fetchData();
  }

  private fetchData(): void {
    this.workspaces$ = this.httpService.getAllWorkspaces();
    this.workspaces$.subscribe(workspaces => {
      console.log('Fetched workspaces:', workspaces);
    });
  }
}

