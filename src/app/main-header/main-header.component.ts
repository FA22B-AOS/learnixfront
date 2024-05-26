import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-header',
  standalone: true,
    imports: [
        RouterOutlet
    ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent {
  @ViewChild("sidebar") sidebar? : ElementRef;

  toggleSidebar() {
    this.sidebar?.nativeElement.classList.toggle("close");
  }

}
