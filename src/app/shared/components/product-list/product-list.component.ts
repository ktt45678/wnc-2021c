import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

import { addToFavorite, removeFromFavorite } from '../../../core/store/favorite';
import { Product, User } from '../../../core/models';
import { AppState } from '../../../core/store';
import { Role } from '../../../core/enums/role.enum';
import { DestroyService } from '../../../core/services/destroy.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [DestroyService]
})
export class ProductListComponent implements OnInit {
  Role = Role;
  pipeTrigger: boolean = true;

  _productList: Product[] = [];

  @Input() loading: boolean = false;
  @Input() set productList(value: Product[]) {
    this._productList = cloneDeep(value);
  }
  @Input() rowSize: number = 5;
  @Input() transparent: boolean = false;

  user$: Observable<User | null>;
  user?: User | null;

  constructor(private store: Store<AppState>, private router: Router, private destroyService: DestroyService) {
    this.user$ = store.select(state => state.auth.user);
  }

  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.destroyService)).subscribe(user => {
      this.user = user;
    });
    interval(60000).pipe(tap(() => {
      this.pipeTrigger = !this.pipeTrigger;
    }), takeUntil(this.destroyService)).subscribe();
  }

  onFavorite(product: Product): void {
    if (!this.user) {
      this.router.navigate(['/auth', 'sign-in']);
      return;
    }
    if (!product.favorited) {
      product.favorited = true;
      this.store.dispatch(addToFavorite({ id: product._id }));
    } else {
      product.favorited = false;
      this.store.dispatch(removeFromFavorite({ id: product._id }));
    }
  }

  trackProduct(index: number, item: any) {
    return item?._id || null;
  }

}
