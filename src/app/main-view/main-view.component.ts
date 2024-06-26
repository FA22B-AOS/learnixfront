import { Component } from '@angular/core';

import {MainHeaderComponent} from "../main-header/main-header.component";
import {RouterOutlet} from "@angular/router";
import {MainContentComponent} from "../main-content/main-content.component";
import {SidebarComponent} from "../Components/sidebar/sidebar.component";

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    SidebarComponent,
    MainHeaderComponent,
    RouterOutlet,
    MainContentComponent
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {
  sidebarClosed = false;

  toggleSidebar(): void {
    this.sidebarClosed = !this.sidebarClosed;
  }

}
