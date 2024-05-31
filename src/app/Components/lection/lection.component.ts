import {Component, Input, input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Lection} from "../../Models/Lection";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../Services/http.service";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Chapter} from "../../Models/Chapter";
import {ChapterComponent} from "./chapter/chapter.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {KeycloakService} from "keycloak-angular";
import {QuizComponent} from "./chapter/quiz/quiz.component";

@Component({
  selector: 'app-lection',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ChapterComponent, ReactiveFormsModule, FormsModule, QuizComponent],
  providers: [HttpService],
  templateUrl: './lection.component.html',
  styleUrl: './lection.component.css'
})
export class LectionComponent {

  protected editMode: boolean = false;
  protected lection: Lection | undefined;
  protected selectedChapterId: number | undefined;
  protected chapters$: Observable<Chapter[]>;
  protected isDialogOpen: boolean = false;
  protected newChapterName = '';
  protected quizMode: boolean = false;
  protected quizAviable: boolean = false;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpService,
              private keycloak: KeycloakService) {
    this.chapters$ = of([]);
  }

  ngOnInit():void{
    this.http.GetLection(Number(this.route.snapshot.paramMap.get('lectionId'))).then((result) => {
      if(result instanceof HttpErrorResponse){
        if(result.status === 404)
          this.router.navigateByUrl('/404');
      }
      this.lection = result;
      if(this.route.snapshot.queryParams['editMode']) {
        const userGUID: string | undefined = this.keycloak.getKeycloakInstance().subject;
        if(userGUID !== undefined)
          this.editMode = userGUID === this.lection.creatorGuid
        else
          this.editMode = false;
      }
      this.chapters$ = this.http.GetChapters(this.lection.lectionId);
    });
  }

  protected selectChapter(chapterId:number){
    this.quizMode = false;
    this.selectedChapterId = chapterId;
  }

  protected openNewChapterDialog() {
    this.isDialogOpen = true;
  }

  protected closeDialog() {
    this.isDialogOpen = false;
  }

  protected addNewChapter() {
    if(this.lection !== undefined)
      this.http.CreateChapter(new Chapter(-1,this.newChapterName, this.lection.lectionId)).then(result => {
        //@ts-ignore
        this.chapters$ = this.http.GetChapters(this.lection.lectionId);
      });
    this.closeDialog();
  }

  protected deleteLection():void{
    if(this.lection !== undefined)
      this.http.DeleteLection(this.lection.lectionId).subscribe(value => {
        this.router.navigateByUrl('/mylections');
      })
  }

  protected startQuiz():void{
   this.quizMode = true;
  }

}
