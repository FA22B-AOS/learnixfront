import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpService} from "../../../../Services/http.service";
import {Quiz} from "../../../../Models/Quiz";


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  @Input() lectionId!: number | undefined;
  quizzes: Quiz[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: Quiz | undefined;
  showResult: boolean = false;
  resultMessage: string = '';
  userId: string = '123e4567-e89b-12d3-a456-426614174000'; // Beispiel UUID des Benutzers
  score: number = 0;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    if(this.lectionId !== undefined)
      this.http.GetQuizzesByLectionId(this.lectionId).subscribe((quizzes) => {
        this.quizzes = quizzes;
        this.loadQuestion();
      });
  }

  protected loadQuestion(): void {
    this.currentQuestion = this.quizzes[this.currentQuestionIndex];
    this.showResult = false;
  }

  protected selectOption(index: number): void {
    if(this.showResult)
      return;
    if (this.currentQuestion) {
      this.http.submitQuizAnswer(this.currentQuestion.id, index, this.userId).subscribe((answer) => {
        const elements = Array.from(document.getElementsByClassName('quizBtn'));

        elements.forEach((element) => {
          const htmlElement = element as HTMLElement;
          htmlElement.classList.remove('quizBtn');
          if((htmlElement.id == 'btn'+index) && answer.isCorrect)
            htmlElement.classList.add('btnCorrect')
          else if (htmlElement.id == 'btn'+index)
            htmlElement.classList.add('btnIncorrect')
          else
            htmlElement.classList.add('btnDisabled');
        });

        if (answer.isCorrect)
          this.resultMessage = 'Richtig!'
        else
          this.resultMessage = 'Leider falsch!';

        this.showResult = true;
      });
    }
  }


  protected nextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.quizzes.length) {
      this.loadQuestion();
    } else {
      this.resultMessage = 'Quiz Completed!';
      this.currentQuestion = undefined;
    }
  }
}
