import {Component, ElementRef, Input, isDevMode, QueryList, ViewChildren} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {ExtendedKeycloakProfile} from "../extended-keycloak-profile";
import {Observable, of} from "rxjs";
import {Lection} from "../Models/Lection";
import {HttpService} from "../Services/http.service";
import {HttpClientModule} from "@angular/common/http";
import {SidebarService} from "../sidebar-service.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, HttpClientModule],
  providers: [HttpService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isClosed: boolean = false;
  @ViewChildren('arrow') arrows?: QueryList<ElementRef> | undefined;
  protected profileName: any;
  protected profileJob: any;
  protected lections$: Observable<Lection[]>;
  @Input() title?: string;

  activeChildTitle: string = '';

  setActiveChild(title: string) {
    this.activeChildTitle = title;
  }

  constructor(protected keycloak: KeycloakService, protected httpService: HttpService, private sidebarService: SidebarService) {
    this.sidebarService.isClosed$.subscribe(isClosed => this.isClosed = isClosed);

    if (keycloak.isLoggedIn()) {
      keycloak.loadUserProfile().then(async (value) => {
        const typedValue = value as ExtendedKeycloakProfile;

        this.profileName = typedValue.username;
        this.profileJob = typedValue.attributes.job;
      });
    }

    this.lections$ = of([]);
    this.fetchData();
  }

  ngAfterViewInit() {
    this.arrows?.forEach(arrow => {
      arrow.nativeElement.addEventListener('click', (event : Event) => {
        if (event instanceof MouseEvent) { // Type guard for MouseEvent
          const element = event.target as HTMLElement; // Now safe to access parentElement
          const arrowParent = element.parentElement?.parentElement;
          if (arrowParent) {
            arrowParent.classList.toggle('showMenu');
          } else {
            console.warn('Clicked element does not have a suitable parent element');
          }
        }
      });
    });
  }

  logout() {
    this.keycloak.logout(window.location.origin);

  }

  login() {
    this.keycloak.login();
  }

  private fetchData():void{
    this.lections$ = this.httpService.GetLections();
  }

  protected readonly isDevMode = isDevMode;
}
