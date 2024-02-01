import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { DataService } from './data.service';
import { IUserInfo, Status } from '../utils';
import { WarningService } from './warning.service';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = 'http://51.158.107.27:82/api';
  private isLoggedIn: boolean = false;

  get $isLoggedIn() {
    return this.isLoggedIn;
  }

  set $isLoggedIn(status: boolean) {
    this.isLoggedIn = status;
  }

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private warningService: WarningService,
    private cookieService: CookieService
  ) {}

  login(login: string, password: string) {
    const params = {
      login: login,
      password: password,
    };

    return this.http.post(`${this.apiUrl}/login`, params).pipe(
      map((response: any) => {
        if (!response.hasError) {
          this.setUserInfo(response.userInfo);
          this.cookieService.setTokens(response.tokens);
          this.$isLoggedIn = true;
          return this.$isLoggedIn; // Authentication successful
        } else {
          console.error('Authentication failed. Errors:', response.errors);
          return false; // Authentication failed
        }
      }),
      catchError((error) => {
        if (error.error.Message) {
          let message = error.error.Message;
          this.setWarningMassage(Status.error, message);
        }
        if (error.error.errors) {
          let errors = error.error.errors;
          for (let i = 0; i < errors.length; i++) {
            let message = errors[i];
            this.setWarningMassage(Status.error, message);
          }
        }
        console.error('Error during login:', error);
        return of(false); // Authentication failed
      })
    );
  }

  setUserInfo(userInfo: IUserInfo): void {
    this.dataService.userDataSubject.next(userInfo);
  }

  setWarningMassage(status: string, message: string) {
    this.warningService.warningSubject.next({
      status: status,
      message: message,
    });
  }

  // Должен быть отдельный ендпоинт для использования refreshToken
  // и получения новых token, refreshToken.

  // automaticLogin(token: string, refreshToken: string): Observable<any> {
  // }
}
