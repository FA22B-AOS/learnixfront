import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarService} from "../Services/sidebar-service.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-main-header',
  standalone: true,
    imports: [
        RouterOutlet,
        CommonModule
    ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent{
  isClosed: boolean = false;

  constructor(protected sidebarService: SidebarService) {
    this.sidebarService.isClosed$.subscribe(isClosed => this.isClosed = isClosed);
  }

  onToggleSidebar(): void {
    this.sidebarService.toggle();
  }

}
