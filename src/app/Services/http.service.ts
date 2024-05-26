import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Lection} from "../Models/Lection";
import {Chapter} from "../Models/Chapter";
import {ChapterContent} from "../Models/ChapterContent";
import {LectionProgress} from "../Models/LectionProgress";
import {Workspace} from "../Models/Workspace";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  public GetLections():Observable<Lection[]>{
    return this.http.get<Lection[]>(`${this.apiUrl}/lections`,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public GetLectionProgress(UserGUID: string, lectionId: number):Promise<LectionProgress>{
    return new Promise((resolve,reject) => {
      this.http.get<LectionProgress>(`${this.apiUrl}/progress/` + UserGUID + '/' + lectionId).subscribe({
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
      this.http.get<LectionProgress[]>(`${this.apiUrl}/progress/` + UserGUID).subscribe({
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
    return this.http.get<Lection[]>(`${this.apiUrl}/lections/byUser/` + UserGUID,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public RemoveUserProgress(UserGUID: string, LectionID: number):void{
    this.http.delete(`${this.apiUrl}/progress/`+ UserGUID + '/' + LectionID,{
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
      this.http.post(`${this.apiUrl}/progress`, body).subscribe({
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
      this.http.get<Lection>(`${this.apiUrl}/lections/`+id).subscribe({
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
    return this.http.get<Chapter[]>(`${this.apiUrl}/chapters/byLection/`+id,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public GetChapterCount(id: number):Promise<number>{
    return new Promise((resolve, reject) => {
      this.http.get<number>(`${this.apiUrl}/chapters/countByLection/`+id,{
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
    return this.http.get<ChapterContent[]>(`${this.apiUrl}/chapter-contents/byChapter/`+chapterId,{
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
      this.http.put<ChapterContent>(`${this.apiUrl}/chapter-contents/` + chapterContent.chapterContentId, body, {
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
      this.http.post(`${this.apiUrl}/chapter-contents`, newChapterContent).subscribe({
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
      this.http.post(`${this.apiUrl}/chapters`, newChapter).subscribe({
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
      this.http.post(`${this.apiUrl}/lections`, newLection).subscribe({
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
    return this.http.delete<void>(`${this.apiUrl}/lections/` + LectionId,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public DeleteChapter(ChapterId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/chapters/` + ChapterId,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public DeleteChapterContent(ChapterContentId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/chapter-contents/` + ChapterContentId,{
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public MoveChapterContent(chapterContentId: number, moveUp: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/chapter-contents/` + chapterContentId + '/move', moveUp)
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

  public getAllWorkspaces(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${this.apiUrl}/workspaces`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }).pipe(
      map(workspaces => workspaces.map(workspace => {
        return new Workspace(
          workspace.workspaceId,
          workspace.title,
          workspace.ownerId,
          workspace.memberIds || [],
          workspace.publicWorkspace
        );
      }))
    );
  }

  public getMemberWorkspaces(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${this.apiUrl}/workspaces/member`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  setPublicWorkspace(workspaceId: number, publicWorkspace: boolean): Observable<any> {
    const url = `${this.apiUrl}/workspaces/${workspaceId}/public?publicWorkspace=${publicWorkspace}`;
    return this.http.put(url, {}, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }



}
