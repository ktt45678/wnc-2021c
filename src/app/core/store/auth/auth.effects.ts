import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

import { User } from '../../models';
import { signIn, signInSuccess, signInFailure, signOut, signOutSuccess, signOutFailure, signUp, signUpSuccess, signUpFailure, sendConfirmationEmail, sendConfirmationEmailFailure, sendConfirmationEmailSuccess, confirmEmail, confirmEmailFailure, confirmEmailSuccess, recoverPassword, recoverPasswordSuccess, recoverPasswordFailure, resetPassword, resetPasswordSuccess, resetPasswordFailure, refreshToken, refreshTokenSuccess, refreshTokenFailure } from '.';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../enums/role.enum';

@Injectable()
export class AuthEffects {
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap(action =>
        this.authService.signIn(action.email, action.password).pipe(
          map(data => {
            const user = jwt_decode<User>(data.accessToken);
            if (!user?.activated)
              this.router.navigate(['/auth/confirm-email']);
            else if (user.role === Role.ADMIN)
              this.router.navigate(['/admin']);
            else
              this.router.navigate(['/home']);
            return signInSuccess({ tokens: data, user: user });
          }),
          catchError(() => of(signInFailure()))
        )
      )
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap(action =>
        this.authService.signUp(action.fullName, action.email, action.birthdate, action.address, action.password, action.reCaptcha).pipe(
          map(() => {
            this.snackBar.open('Đăng ký thành công, hãy xác thực email của bạn', 'Đóng', { duration: 10000 });
            return signUpSuccess();
          }),
          catchError(() => of(signUpFailure()))
        )
      )
    )
  );

  sendConfirmationEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendConfirmationEmail),
      switchMap(action =>
        this.authService.sendConfirmationEmail(action.reCaptcha).pipe(
          map(() => {
            this.snackBar.open('Đã gửi email xác thực', 'Đóng', { duration: 10000 });
            return sendConfirmationEmailSuccess();
          }),
          catchError(() => of(sendConfirmationEmailFailure()))
        )
      )
    )
  );

  confirmEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmEmail),
      switchMap(action =>
        this.authService.confirmEmail(action.id, action.code).pipe(
          map(data => {
            const user = jwt_decode<User>(data.accessToken);
            return confirmEmailSuccess({ tokens: data, user: user });
          }),
          catchError(() => of(confirmEmailFailure()))
        )
      )
    )
  );

  recoverPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recoverPassword),
      switchMap(action =>
        this.authService.recoverPassword(action.email).pipe(
          map(() => recoverPasswordSuccess()),
          catchError(() => of(recoverPasswordFailure()))
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPassword),
      switchMap(action =>
        this.authService.resetPassword(action.id, action.code, action.password).pipe(
          map(() => resetPasswordSuccess()),
          catchError(() => of(resetPasswordFailure()))
        )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshToken),
      switchMap(action =>
        this.authService.refreshToken(action.token).pipe(
          map(data => {
            const user = jwt_decode<User>(data.accessToken);
            return refreshTokenSuccess({ tokens: data, user: user });
          }),
          catchError(() => {
            this.router.navigate(['/auth/sign-in']);
            return of(refreshTokenFailure());
          })
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      switchMap(action =>
        this.authService.signOut(action.token).pipe(
          map(() => {
            this.router.navigate(['/home']);
            return signOutSuccess();
          }),
          catchError(() => of(signOutFailure))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }
}
