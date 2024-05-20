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
  quizzes: Quiz[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: Quiz | undefined;
  showResult: boolean = false;
  resultMessage: string = '';
  userId: string = '123e4567-e89b-12d3-a456-426614174000'; // Beispiel UUID des Benutzers
  score: number = 0;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    const lectionId = 1; // Beispiel Lection ID
    this.http.GetQuizzesByLectionId(lectionId).subscribe((quizzes) => {
      this.quizzes = quizzes;
      //this.loadQuestion();
    });

    //this.quizService.getTotalScore(this.userId).subscribe((score) => {
    //  this.score = score;
    //});
  }

  loadQuestion(): void {
    this.currentQuestion = this.quizzes[this.currentQuestionIndex];
    this.showResult = false;
  }

  /*selectOption(index: number): void {
    if (this.currentQuestion) {
      this.quizService.submitAnswer(this.currentQuestion.id, index, this.userId).subscribe((answer) => {
        if (answer.isCorrect) {
          this.resultMessage = 'Correct!';
          this.score++;
        } else {
          this.resultMessage = 'Incorrect!';
        }
        this.showResult = true;
      });
    }
  }*/

  nextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.quizzes.length) {
      this.loadQuestion();
    } else {
      this.resultMessage = 'Quiz Completed!';
      this.currentQuestion = undefined;
    }
  }
}
