import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import jwt_decode from 'jwt-decode';

import { Jwt } from '../models/jwt.model';
import { IoEvent } from '../enums/io-event.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refreshTokenTimeout: any;

  constructor(private http: HttpClient, private socket: Socket) { }

  signIn(email: string, password: string) {
    return this.http.post<Jwt>('auth/login', { email, password }).pipe(tap(tokens => {
      this.startRefreshTokenTimer(tokens.accessToken, tokens.refreshToken);
    }));
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

  signOut(token: string) {
    this.stopRefreshTokenTimer();
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken)
      this.socket.emit(IoEvent.UNAUTHENTICATE, { accessToken });
    return this.http.post('auth/revoke-token', { token });
  }

  private startRefreshTokenTimer(accessToken: string, refreshToken: string) {
    // Parse json object from base64 encoded jwt token
    const payload = jwt_decode<any>(accessToken);
    // Set a timeout to refresh the token a minute before it expires
    const expires = new Date(payload.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(refreshToken).subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
