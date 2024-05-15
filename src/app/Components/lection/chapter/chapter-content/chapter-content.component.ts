import {Component, Input} from '@angular/core';
import {ChapterContent} from "../../../../Models/ChapterContent";

@Component({
  selector: 'app-chapter-content',
  standalone: true,
  imports: [],
  templateUrl: './chapter-content.component.html',
  styleUrl: './chapter-content.component.css'
})
export class ChapterContentComponent {
  @Input() cont: ChapterContent | undefined;
}
