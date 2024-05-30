import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {ProgressChartComponent} from "../Components/progress-chart/progress-chart.component";
import {HttpService} from "../Services/http.service";
import {KeycloakService} from "keycloak-angular";
import {Workspace} from "../Models/Workspace";
import {RouterLink} from "@angular/router";

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


  constructor(private httpService: HttpService, private keycloak: KeycloakService) {
  }

  ngOnInit(): void {
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
