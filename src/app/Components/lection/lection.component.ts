import {Component, Input, input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Lection} from "../../Models/Lection";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../Services/http.service";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Chapter} from "../../Models/Chapter";
import {ChapterComponent} from "./chapter/chapter.component";

@Component({
  selector: 'app-lection',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ChapterComponent],
  providers: [HttpService],
  templateUrl: './lection.component.html',
  styleUrl: './lection.component.css'
})
export class LectionComponent {

  protected lection: Lection | undefined;
  protected selectedChapterId: number | undefined;
  protected chapters$: Observable<Chapter[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpService) {
    this.chapters$ = of([]);
  }

  ngOnInit():void{
    this.http.GetLection(Number(this.route.snapshot.paramMap.get('lectionId'))).then((result) => {
      if(result instanceof HttpErrorResponse){
        if(result.status === 404)
          this.router.navigateByUrl('/404');
      }
      this.lection = result;
      this.chapters$ = this.http.GetChapters(this.lection.lectionId);
    });
  }

  protected selectChapter(chapterId:number){
    this.selectedChapterId = chapterId;
  }

}
