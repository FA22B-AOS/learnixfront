import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _isClosed = new BehaviorSubject<boolean>(false);
  isClosed$ = this._isClosed.asObservable();

  toggle() {
    this._isClosed.next(!this._isClosed.value);
  }
}
