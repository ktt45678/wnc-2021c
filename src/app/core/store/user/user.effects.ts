import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { findAllUsers, findAllUsersSuccess, findAllUsersFailure, findOneUser, findOneUserSuccess, findOneUserFailure, updateUser, updateUserSuccess, updateUserFailure, findCurrentUser, findCurrentUserSuccess, findCurrentUserFailure } from '.';
import { UsersService } from '../../services/users.service';

@Injectable()
export class UserEffects {
  findAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findAllUsers),
      switchMap(action =>
        this.usersService.findAll(action.page, action.limit, action.search, action.sort, action.filter).pipe(
          map(data => findAllUsersSuccess({ payload: data })),
          catchError(() => of(findAllUsersFailure()))
        )
      )
    )
  );

  findOneUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findOneUser),
      switchMap(action =>
        this.usersService.findOne(action.id).pipe(
          map(data => findOneUserSuccess({ payload: data })),
          catchError(() => of(findOneUserFailure()))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap(action =>
        this.usersService.update(action.id, action.fullName, action.email, action.birthdate, action.address, action.currentPassword, action.password, action.role, action.canSellUntil).pipe(
          map(data => {
            this.snackBar.open('Cập nhật thành công', 'Đóng', { duration: 10000 });
            return updateUserSuccess({ payload: data });
          }),
          catchError(() => of(updateUserFailure()))
        )
      )
    )
  );

  findCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findCurrentUser),
      switchMap(() =>
        this.usersService.findCurrent().pipe(
          map(data => findCurrentUserSuccess({ payload: data })),
          catchError(() => of(findCurrentUserFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService, private snackBar: MatSnackBar) { }
}
