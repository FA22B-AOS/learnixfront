import {Component, Input} from '@angular/core';
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

  constructor(private httpService: HttpService, private keycloak: KeycloakService) {
  }

  ngOnInit(): void {
  }

  protected requestAccess() {

  }

}
