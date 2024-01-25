import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IErrorItem } from './utils'

@Injectable({
  providedIn: 'root'
})
export class WarningService {

  warningSubject = new BehaviorSubject<IErrorItem>(undefined as unknown as IErrorItem);
  warningData$: Observable<IErrorItem> = this.warningSubject.asObservable();

  constructor() { }
}
