import { Injectable } from '@angular/core';
import { CookieService as ngxCookieService } from 'ngx-cookie-service';
import { ITokensInfo } from './utils';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private tokenCookieName = 'token';
  private refreshTokenCookieName = 'refreshToken';

  constructor(private ngxCookieService: ngxCookieService) { }

  // Set tokens in cookies
  setTokens(tokens: ITokensInfo): void {
    this.ngxCookieService.set(this.tokenCookieName, tokens.token);
    this.ngxCookieService.set(this.refreshTokenCookieName, tokens.refreshToken);
  }

  // Get the access token from cookies
  getAccessToken(): string {
    return this.ngxCookieService.get(this.tokenCookieName);
  }

  // Get the refresh token from cookies
  getRefreshToken(): string {
    return this.ngxCookieService.get(this.refreshTokenCookieName);
  }

  removeTokens(): void {
    // Remove tokens from cookies
    this.ngxCookieService.delete(this.tokenCookieName);
    this.ngxCookieService.delete(this.refreshTokenCookieName);
  }
}
