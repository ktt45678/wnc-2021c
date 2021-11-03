import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { addToFavorite, addToFavoriteFailure, addToFavoriteSuccess, removeFromFavorite, removeFromFavoriteFailure, removeFromFavoriteSuccess } from '.';
import { ProductsService } from '../../services/products.service';

@Injectable()
export class FavoriteEffects {
  addToFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavorite),
      switchMap(action =>
        this.productsService.addToFavorite(action.id).pipe(
          map(() => addToFavoriteSuccess()),
          catchError(() => of(addToFavoriteFailure()))
        )
      )
    )
  );

  removeFromFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromFavorite),
      switchMap(action =>
        this.productsService.removeFromFavorite(action.id).pipe(
          map(() => removeFromFavoriteSuccess()),
          catchError(() => of(removeFromFavoriteFailure()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productsService: ProductsService) { }
}
