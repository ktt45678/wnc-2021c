import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { findAllUsers, findAllUsersSuccess, findAllUsersFailure } from '.';
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

  constructor(private actions$: Actions, private usersService: UsersService, private snackBar: MatSnackBar) { }
}
