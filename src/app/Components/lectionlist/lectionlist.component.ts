import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {forkJoin, map, Observable, of, take} from "rxjs";
import {Lection} from "../../Models/Lection";
import {HttpService} from "../../Services/http.service";
import { FormsModule } from '@angular/forms';
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {LektioncardComponent} from "../lektioncard/lektioncard.component";
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-lectionlist',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    LektioncardComponent,
    HttpClientModule,
    CommonModule,
    RouterLink,
    FormsModule
  ],
  providers: [HttpService],
  templateUrl: './lectionlist.component.html',
  styleUrl: './lectionlist.component.css'
})
export class LectionlistComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef | undefined;
  protected lections$: Observable<Lection[]>;
  protected privateList: boolean = false;
  protected noLections: boolean = false;
  protected isDialogOpen: boolean = false;
  protected newLectionName = '';
  protected newLectionDescription = '';
  private readonly UserGUID: string | undefined;

  constructor(private httpService: HttpService, private router: Router, private keycloak: KeycloakService) {
    this.lections$ = of([]);
    this.privateList = this.router.url === '/learning/mylections';
    this.UserGUID = this.keycloak.getKeycloakInstance().subject;
    this.fetchData();
  }

  protected removeLectionFromList(lectionToRemove: Lection): void {
    if(this.privateList && this.UserGUID !== undefined)
      this.httpService.RemoveUserProgress(this.UserGUID, lectionToRemove.lectionId);
    else if (this.UserGUID != undefined)
      this.httpService.CreateUserProgress(this.UserGUID, lectionToRemove.lectionId);

    this.lections$ = this.lections$.pipe(
      map(lections => lections.filter(lection => lection.lectionId !== lectionToRemove.lectionId))
    );
  }

  private fetchData():void {
    if (this.privateList && this.UserGUID != undefined) {
      this.lections$ = this.httpService.GetSubscribedLections(this.UserGUID);
      this.lections$.pipe(map(list => list.length <= 0)).subscribe(isEmpty => this.noLections = isEmpty);
   }
    else if (this.UserGUID != undefined)
      this.lections$ = this.getUnsubscribedLections();
  }

  private getUnsubscribedLections(): Observable<Lection[]> {
    // @ts-ignore
    const subscribedLections$ = this.httpService.GetSubscribedLections(this.UserGUID);
    const lections$ = this.httpService.GetLections();

    return forkJoin({
      subscribedLections: subscribedLections$.pipe(take(1)),
      lections: lections$.pipe(take(1))
    }).pipe(
      map(({ subscribedLections, lections }) => {
        const subscribedLectionIds = subscribedLections.map(lection => lection.lectionId);
        return lections.filter(lection => !subscribedLectionIds.includes(lection.lectionId));
      })
    );
  }

  protected openNewLectionDialog() {
    this.isDialogOpen = true;
  }

  protected closeDialog() {
    this.isDialogOpen = false;
  }

  protected addNewLection() {
    if(this.UserGUID !== undefined)
      this.httpService.CreateLection(new Lection(-1,this.newLectionName, this.UserGUID ,this.newLectionDescription, 'X')).then(result => {
        //@ts-ignore
        this.httpService.CreateUserProgress(this.UserGUID, result.lectionId).then(res =>{
          this.fetchData();
        });
      });
    this.closeDialog();
  }
}
