import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

constructor (private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit(): void {
    // Должен быть отдельный ендпоинт для использования refreshToken
    // и получения новых token, refreshToken.

  //   const token = this.cookieService.getAccessToken();
  //   const refreshToken = this.cookieService.getRefreshToken();

  //   if (token && refreshToken) {
  //     this.authService.automaticLogin(token, refreshToken)
  //       .subscribe(
  //         () => {
  //           console.log('Automatic login successful');
  //         },
  //         (error) => {
  //           console.error('Automatic login failed:', error);
  //         }
  //       );
  //   }
  }
}
