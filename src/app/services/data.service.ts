import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserInfo } from "../utils";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userDataSubject = new BehaviorSubject<IUserInfo | undefined>(undefined);
  userData$: Observable<IUserInfo | undefined> = this.userDataSubject.asObservable();

  constructor() { }
}
