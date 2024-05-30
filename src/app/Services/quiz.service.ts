import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quiz} from "../Models/Quiz";

interface Answer {
  id: number;
  quizId: number;
  selectedOption: number;
  isCorrect: boolean;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public GetByLectionId(lectionId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>('http://localhost:8081/quizzes/lection/'+lectionId,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public SubmitAnswer(quizId: number, selectedOption: number, userId: string): Observable<Answer> {
    let body = {
      quizId: quizId,
      selectedOption: selectedOption,
      userGUID: userId
    }
    return this.http.post<Answer>('http://localhost:8081/answers', body);
  }

  public GetTotalScore(lectionId: number, userId: string): Observable<number> {
    return this.http.get<number>('http://localhost:8081/answers/'+lectionId+'/'+userId,);
  }

}
