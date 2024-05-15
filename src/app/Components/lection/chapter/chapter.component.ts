import {Component, Input} from '@angular/core';
import {Chapter} from "../../../Models/Chapter";
import {Observable, of} from "rxjs";
import {ChapterContent} from "../../../Models/ChapterContent";
import {HttpService} from "../../../Services/http.service";
import {HttpClientModule} from "@angular/common/http";
import {AsyncPipe, CommonModule} from "@angular/common";
import {ChapterContentComponent} from "./chapter-content/chapter-content.component";

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [HttpClientModule, AsyncPipe, ChapterContentComponent, CommonModule],
  providers: [HttpService],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.css'
})
export class ChapterComponent {

  @Input() chapter: Chapter | undefined;
  protected content: ChapterContent[] | undefined;

  constructor(private http: HttpService) {

  }

  ngOnInit():void{
    this.fetchData();
  }

  private fetchData():void{
    if(this.chapter?.chapterId != undefined)
      this.http.GetChapterContent(this.chapter.chapterId).then((result) => {
        this.content = result;
      });
  }
}
