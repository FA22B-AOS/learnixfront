import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lection} from "../Models/Lection";
import {Chapter} from "../Models/Chapter";
import {ChapterContent} from "../Models/ChapterContent";
import {LectionProgress} from "../Models/LectionProgress";
import {KeycloakService} from "keycloak-angular";
import {KeycloakUser} from "../Models/KeycloakUser";
import {Workspace} from "../Models/Workspace";
import {WorkspaceJoinRequest} from "../Models/WorkspaceJoinRequest";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient, private KeycloakService: KeycloakService) { }

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
    });
  }

  public getWorkspaceById(workspaceId: number): Observable<Workspace> {
    return this.http.get<Workspace>(`${this.apiUrl}/workspaces/${workspaceId}`, {
      headers: new HttpHeaders()
        .set('Content-Type','application/json')
    });
  }

  public getMemberWorkspaces(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${this.apiUrl}/workspaces/member`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  createWorkspace(workspaceData: { title: string}): Observable<Workspace> {
    return this.http.post<Workspace>(`${this.apiUrl}/workspaces`, workspaceData);
  }

  public setPublicWorkspace(workspaceId: number, publicWorkspace: boolean) {
    const url = `${this.apiUrl}/workspaces/${workspaceId}/public?publicWorkspace=${publicWorkspace}`;
    return this.http.post(url, {}, {});
  }

  public setInviteOnly(workspaceId: number, inviteOnly: boolean){
    const url = `${this.apiUrl}/workspaces/${workspaceId}/invite-only?inviteOnly=${inviteOnly}`;
    return this.http.post(url, {}, {});
  }

  public requestAccessToWorkspace(workspace: Workspace, userId: string): Promise<WorkspaceJoinRequest> {
    const url = `${this.apiUrl}/workspaces/join-request`;
    const body = {
      workspaceId: workspace.workspaceId,
      requesterUserId: userId
    };

    return new Promise((resolve, reject) => {
      this.http.post<WorkspaceJoinRequest>(url, body, {
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

  public getWorkspaceJoinRequests(workspaceId: number): Observable<WorkspaceJoinRequest[]> {
    return this.http.get<WorkspaceJoinRequest[]>(`${this.apiUrl}/workspaces/join-request/requestByWorkspaceId?workspaceId=${workspaceId}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  public acceptWorkspaceJoinRequest(requestId: number): Promise<void> {
    const url = `${this.apiUrl}/workspaces/join-request/${requestId}/accept`;

    return new Promise((resolve, reject) => {
      this.http.post(url, {}).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    });
  }

  public denyWorkspaceJoinRequest(requestId: number): Promise<void> {
    const url = `${this.apiUrl}/workspaces/join-request/${requestId}/deny`;

    return new Promise((resolve, reject) => {
      this.http.post(url, {}).subscribe({
        next: () => {
          resolve();
        },
        error: (error) => {
          console.error(error);
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

  public UpdateKeyCloakUser(userID: string, body: any): void{
    this.http.put('http://localhost:8080/admin/realms/learnix/users/' + userID , body).subscribe({
      next: (response:any) => {
        console.log(response);
        alert("User updated")
      },
      error: (error) => {
        console.log(error);
        alert("User could not be updated. Please check the E-Mail and other Parameters")
      }
    });
  }

  public DeleteKeycloakUser(userID: string, body: any): void{
    this.http.delete('http://localhost:8080/admin/realms/learnix/users/'+userID, body).subscribe({
      next: (response:any) => {
        console.log(response);
        alert("User has been deleted")
      },
      error: (error) => {
        alert("User is already Deletet.")
        console.log(error);
      }
    });
  }

  public AddKeycloakUser(body: any): void{
    this.http.post('http://localhost:8080/admin/realms/learnix/users/', body).subscribe({
      next: (response:any) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public GetId(username: string): Promise<KeycloakUser[]>{
    const headers = new HttpHeaders();
    this.KeycloakService.addTokenToHeader(headers);
    return new Promise((resolve, reject) => {
      this.http.get<any[]>('http://localhost:8080/admin/realms/learnix/users?username='+ username, {headers: headers}).
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

  public SetTempPass(userId : string): Promise<any>{
    const body = {
      type: "password",
      temporary: true,
      value: 'Test123'
    }
    return new Promise((resolve, reject) => {
      this.http.put<any>('http://localhost:8080/admin/realms/learnix/users/' + userId + '/reset-password', body, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe({
        next: (response) => {
          resolve(response);
          console.log(response);
          alert("User Added Successfully, your temporary password: 'Test123' , Please log in to update your password.")
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    });
  }
}
