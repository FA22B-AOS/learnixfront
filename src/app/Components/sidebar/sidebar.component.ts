import {Component, ElementRef, Input, isDevMode, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {ExtendedKeycloakProfile} from "../../extended-keycloak-profile";
import {filter, Observable, of} from "rxjs";
import {Lection} from "../../Models/Lection";
import {HttpService} from "../../Services/http.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, HttpClientModule],
  providers: [HttpService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @ViewChild("sidebar") sidebar? : ElementRef;
  @ViewChildren('arrow') arrows?: QueryList<ElementRef> | undefined;
  protected profileName: any;
  protected profileJob: any;
  protected lections$: Observable<Lection[]>;

  protected menuItems: { id: number, name: string, symbol?: string }[] = [
    { "id": 0, "name": "Home", "symbol": "bi-house" },
    { "id": 1, "name": "Lections", "symbol": "bi-book"},
    { "id": 2, "name": "Practice", "symbol": "bi-lightning"},
    { "id": 3, "name": "Statistics", "symbol": "bi-graph-up"}
  ];
  @Input() title?: string;

  constructor(protected keycloak: KeycloakService, protected httpService: HttpService, private router: Router) {
    if (keycloak.isLoggedIn()) {
      keycloak.loadUserProfile().then(async (value) => {
        const typedValue = value as ExtendedKeycloakProfile;

        this.profileName = typedValue.username;
        this.profileJob = typedValue.attributes.job;
        console.log(typedValue);
      });
    }

    this.lections$ = of([]);
    this.fetchData();
  }

  ngOnInit() {
      this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        console.log('Navigation to:', event.url);
      });

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

  toggleSidebar() {
    this.sidebar?.nativeElement.classList.toggle("close");
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
