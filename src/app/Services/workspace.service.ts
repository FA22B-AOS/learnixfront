import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Workspace} from "../Models/Workspace";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private workspaceSubject: BehaviorSubject<Workspace | undefined> = new BehaviorSubject<Workspace | undefined>(undefined);

  constructor() {}

  setWorkspace(workspace: Workspace): void {
    this.workspaceSubject.next(workspace);
  }

  getWorkspace(): Observable<Workspace | undefined> {
    return this.workspaceSubject.asObservable();
  }

  resetWorkspace(): void {
    this.workspaceSubject.next(undefined);
  }
}
