import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { findAllCategories, findAllCategoriesSuccess, findAllCategoriesFailure } from '.';
import { CategoriesService } from '../../services/categories.service';

@Injectable()
export class CategoryEffects {
  findAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(findAllCategories),
      switchMap(action =>
        this.categoriesService.findAll(action.page, action.limit, action.search, action.sort).pipe(
          map(data => findAllCategoriesSuccess({ payload: data })),
          catchError(() => of(findAllCategoriesFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private categoriesService: CategoriesService, private snackBar: MatSnackBar) { }
}
