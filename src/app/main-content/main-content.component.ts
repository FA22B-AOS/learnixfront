import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarService} from "../sidebar-service.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  isClosed: boolean = false;

  constructor(protected sidebarService: SidebarService) {
    this.sidebarService.isClosed$.subscribe(isClosed => this.isClosed = isClosed);
  }

}
