import { Component } from '@angular/core';
import {WorkspacecardComponent} from "../workspacecard/workspacecard.component";

@Component({
  selector: 'app-workspacelist',
  standalone: true,
  imports: [
    WorkspacecardComponent
  ],
  templateUrl: './workspacelist.component.html',
  styleUrl: './workspacelist.component.css'
})
export class WorkspacelistComponent {

}
