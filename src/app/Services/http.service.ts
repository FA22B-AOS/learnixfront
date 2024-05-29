import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lection} from "../Models/Lection";
import {Chapter} from "../Models/Chapter";
import {ChapterContent} from "../Models/ChapterContent";
import {LectionProgress} from "../Models/LectionProgress";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {KeycloakService} from "keycloak-angular";
import {KeycloakUser} from "../Models/KeycloakUser";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private KeycloakService: KeycloakService) { }

  public GetLections():Observable<Lection[]>{
    return this.http.get<Lection[]>('http://localhost:8081/lections',{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public GetLectionProgress(UserGUID: string, lectionId: number):Promise<LectionProgress>{
    return new Promise((resolve,reject) => {
      this.http.get<LectionProgress>('http://localhost:8081/progress/' + UserGUID + '/' + lectionId).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          console.log(error);
          reject(error);
        }
      });
    });
  }
  public GetAllUserprogress(UserGUID: string):Promise<LectionProgress[]>{
    return new Promise((resolve, reject) => {
      this.http.get<LectionProgress[]>('http://localhost:8081/progress/' + UserGUID).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    });
  }

  public GetSubscribedLections(UserGUID: string):Observable<Lection[]>{
    return this.http.get<Lection[]>('http://localhost:8081/lections/byUser/' + UserGUID,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public RemoveUserProgress(UserGUID: string, LectionID: number):void{
    this.http.delete('http://localhost:8081/progress/' + UserGUID + '/' + LectionID,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    }).subscribe(e => console.log(e));
  }

  public CreateUserProgress(UserGUID: string, LectionID: number): Promise<LectionProgress>{
    let body = {
      "userGUID": UserGUID,
      "lectionID": LectionID
    }

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8081/progress', body).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    });
  }


  public GetLection(id: number):Promise<Lection>{
    return new Promise((resolve, reject) => {
      this.http.get<Lection>('http://localhost:8081/lections/'+id).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    });
  }

  public GetChapters(id: number):Observable<Chapter[]>{
    return this.http.get<Chapter[]>('http://localhost:8081/chapters/byLection/'+id,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public GetChapterCount(id: number):Promise<number>{
    return new Promise((resolve, reject) => {
      this.http.get<number>('http://localhost:8081/chapters/countByLection/'+id,{
        headers: new HttpHeaders()
          .set('Content-Type','application/json')
      }).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    });
  }

  public GetChapterContent(chapterId: number):Observable<ChapterContent[]>{
    return this.http.get<ChapterContent[]>('http://localhost:8081/chapter-contents/byChapter/'+chapterId,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public SaveChapterContent(chapterContent: ChapterContent, newContent: string): Promise<ChapterContent>{
    const body = {
      chapterContentId: chapterContent.chapterContentId,
      contentType: chapterContent.contentType,
      content: newContent,
      contentOrder: chapterContent.contentOrder,
      chapterId: chapterContent.chapterId
    }

    return new Promise((resolve, reject) => {
      this.http.put<ChapterContent>('http://localhost:8081/chapter-contents/' + chapterContent.chapterContentId, body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    });
  }

  public CreateChapterContent(newChapterContent: ChapterContent): Promise<ChapterContent>{
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8081/chapter-contents', newChapterContent).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    });
  }

  public CreateChapter(newChapter: Chapter): Promise<Chapter>{
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8081/chapters', newChapter).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    });
  }

  public CreateLection(newLection: Lection): Promise<Lection>{
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8081/lections', newLection).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    });
  }

  public DeleteLection(LectionId: number):Observable<void>{
    return this.http.delete<void>('http://localhost:8081/lections/' + LectionId,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public DeleteChapter(ChapterId: number):Observable<void>{
    return this.http.delete<void>('http://localhost:8081/chapters/' + ChapterId,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public DeleteChapterContent(ChapterContentId: number):Observable<void>{
    return this.http.delete<void>('http://localhost:8081/chapter-contents/' + ChapterContentId,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public MoveChapterContent(chapterContentId: number, moveUp: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8081/chapter-contents/' + chapterContentId + '/move', moveUp)
        .subscribe({
          next: (response:any) => {
            resolve(response);
          },
          error: (error) => {
            reject(error);
          }
        });
    });
  }

  public GetKeycloakUsers(): Promise<KeycloakUser[]>{
    const headers = new HttpHeaders();
    this.KeycloakService.addTokenToHeader(headers);

   return new Promise((resolve, reject) => {
     this.http.get('http://localhost:8080/admin/realms/learnix/users', {headers: headers}).
     subscribe({
       next: (response:any) => {
         resolve(response);
       },
       error: (error) => {
         reject(error);
       } })
     ;
   })
  }


  public GetUserInfo(userid: number): Promise<KeycloakUser[]>{
    const headers = new HttpHeaders();
    this.KeycloakService.addTokenToHeader(headers);

    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/admin/realms/learnix/users/'+ userid, {headers: headers}).
      subscribe({
        next: (response:any) => {
          resolve(response);
        },
        error: (error) => {
          reject(error);
        } })
      ;
    })
  }

}
