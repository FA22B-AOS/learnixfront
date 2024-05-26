import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {MainHeaderComponent} from "../main-header/main-header.component";

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    SidebarComponent,
    MainHeaderComponent
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

}
