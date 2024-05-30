import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Quiz} from "../../../../Models/Quiz";
import {QuizService} from "../../../../Services/quiz.service";
import {KeycloakService} from "keycloak-angular";
import {HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  providers: [QuizService],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  @Input() lectionId!: number | undefined;
  protected quizzes: Quiz[] = [];
  protected currentQuestionIndex: number = 0;
  protected currentQuestion: Quiz | undefined;
  showResult: boolean = false;
  resultMessage: string = '';

  constructor(private quizService: QuizService, private kc: KeycloakService) {}

  ngOnInit(): void {
    if(this.lectionId !== undefined)
      this.quizService.GetByLectionId(this.lectionId).subscribe((quizzes) => {
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

    const userGUID: string | undefined = this.kc.getKeycloakInstance().subject;
    if (this.currentQuestion && userGUID !== undefined) {
      this.quizService.SubmitAnswer(this.currentQuestion.id, index, userGUID).subscribe((answer) => {
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
