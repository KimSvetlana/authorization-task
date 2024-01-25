import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { DataService } from './data.service';
import { IUserInfo, IResponse , IErrorItem, Status } from './utils'
import { WarningService } from './warning.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn : boolean = false;
  private apiUrl = 'http://51.158.107.27:82'

  get $isLoggedIn(){
    return this.isLoggedIn
  }

  set $isLoggedIn(status: boolean){
    this.isLoggedIn = status;
  }

  constructor(private http: HttpClient, private dataService: DataService, private warningService: WarningService ) {}

  login(login: string, password: string) {
    const params = {
      login: login,
      password: password
    };

    return this.http.post(`${this.apiUrl}/api/login`, params)
    .pipe(
      map((response: any) => {
        if (!response.hasError) {
          this.setUserInfo(response.userInfo);
          this.setTokens(response.tokens);
          this.$isLoggedIn = true;
          return this.$isLoggedIn; // Authentication successful
        } else {
          console.error('Authentication failed. Errors:', response.errors);
          return false; // Authentication failed
        }
      }),
      catchError(error => {
        let errors = error.error.errors
        for(let i = 0; i < errors.length; i++ ){
          this.warningService.warningSubject.next({
            status: Status.error,
            message: errors[i]
          })
        }
        console.error('Error during login:', error);
        return of(false); // Authentication failed due to an error
      })
    );
    }

  setUserInfo(userInfo: IUserInfo): void {
    console.log('user Info = ', userInfo)
    this.dataService.userDataSubject.next(userInfo)
  }

  setTokens(tokens: IResponse['data']['tokens']): void {
    // Save tokens in a secure way (e.g., local storage)
  }

}

