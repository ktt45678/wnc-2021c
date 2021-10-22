import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Jwt } from '../models/jwt.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refreshTokenTimeout: any;

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  signIn(email: string, password: string) {
    return this.http.post<Jwt>('auth/login', { email, password });
  }

  signUp(fullName: string, email: string, birthdate: Date, address: string, password: string, reCaptcha: string) {
    return this.http.post<Jwt>('auth/register', { fullName, email, birthdate, address, password, reCaptcha });
  }

  sendConfirmationEmail(reCaptcha: string) {
    return this.http.post('auth/send-confirmation-email', { reCaptcha });
  }

  confirmEmail(id: number, code: string) {
    return this.http.post<Jwt>('auth/confirm-email', { id, code });
  }

  recoverPassword(email: string) {
    return this.http.post('auth/send-recovery-email', { email });
  }

  resetPassword(id: number, code: string, password: string) {
    return this.http.post<Jwt>('auth/reset-password', { id, code, password });
  }

  refreshToken(token: string) {
    return this.http.post<Jwt>('auth/refresh-token', { token }).pipe(tap(tokens => {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      this.startRefreshTokenTimer(tokens.accessToken, tokens.refreshToken);
    }));
  }

  signOut(refreshToken: string) {
    this.stopRefreshTokenTimer();
    return this.http.post('auth/revoke-token', { refreshToken });
  }

  private startRefreshTokenTimer(accessToken: string, refreshToken: string) {
    // Parse json object from base64 encoded jwt token
    const payload = this.jwtService.decodeToken(accessToken);
    // Set a timeout to refresh the token a minute before it expires
    const expires = new Date(payload.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(refreshToken).subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
