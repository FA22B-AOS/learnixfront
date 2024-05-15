import {Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Observable, of} from "rxjs";
import {Lection} from "../Models/Lection";
import {HttpService} from "../Services/http.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterLink, RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, RouterOutlet],
  providers: [HttpService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  protected lections$: Observable<Lection[]>;
  protected profileName: string='';

  constructor(private httpService: HttpService, private keycloakService: KeycloakService, private router: Router) {
    this.lections$ = of([]);
    this.fetchData();

    this.keycloakService.loadUserProfile().then(async (value:any) =>{
      this.profileName = value.username;
    })
  }

  ngOnInit():void {
  }

  private fetchData():void{
    this.lections$ = this.httpService.GetLections();
  }

  isLandingPage(): boolean{
    return this.router.url === 'LandingPage'
  }

  toggleSidebar(){
    console.log('Sidebar wurde umgeschaltet');
  }
}
