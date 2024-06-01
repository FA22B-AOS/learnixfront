import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";


import {KeycloakService} from "keycloak-angular";

import {RouterLink} from "@angular/router";
import {ProgressChartComponent} from "../progress-chart/progress-chart.component";
import {Workspace} from "../../Models/Workspace";
import {HttpService} from "../../Services/http.service";

@Component({
  selector: 'app-workspacecard',
  standalone: true,
  imports: [
    NgIf,
    ProgressChartComponent,
    RouterLink
  ],
  templateUrl: './workspacecard.component.html',
  styleUrl: './workspacecard.component.css'
})
export class WorkspacecardComponent {
  @Input() workspace!: Workspace;
  @Input() member = true;
  @Output() requestResult: EventEmitter<string> = new EventEmitter<string>();


  constructor(private httpService: HttpService, protected keycloak: KeycloakService) {
  }

  ngOnInit(): void {
    console.log("Workspace???", this.workspace);
    console.log("MemberCount", this.workspace.memberCount);
  }

  protected requestAccess() {
    const userGUID: string | undefined = this.keycloak.getKeycloakInstance().subject;
    if (userGUID != undefined && this.workspace)
    {
      this.httpService.requestAccessToWorkspace(this.workspace, userGUID).then(() => {
        console.log('Request submitted successfully');
        this.requestResult.emit('success');
      })
        .catch((error) => {
          console.error('Error submitting request', error);
          this.requestResult.emit('error: ' + error.message);
        });
    }
  }

}
