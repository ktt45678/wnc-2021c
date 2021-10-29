import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { AppState } from '../../../../core/store';
import { Product } from '../../../../core/models';
import { destroyProducts, findTopBidProducts, findTopEndProducts, findTopPriceProducts } from '../../../../core/store/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterContentInit, OnDestroy {
  StoreStatus = StoreStatus;

  findTopEndProductsStatus$: Observable<StoreStatus>;
  findTopBidProductsStatus$: Observable<StoreStatus>;
  findTopPriceProductsStatus$: Observable<StoreStatus>;
  topEndProducts$: Observable<Product[]>;
  topBidProducts$: Observable<Product[]>;
  topPriceProducts$: Observable<Product[]>;

  constructor(private store: Store<AppState>) {
    this.findTopEndProductsStatus$ = store.select(state => state.product.findTopEndProductsStatus);
    this.findTopBidProductsStatus$ = store.select(state => state.product.findTopBidProductsStatus);
    this.findTopPriceProductsStatus$ = store.select(state => state.product.findTopPriceProductsStatus);
    this.topEndProducts$ = store.select(state => state.product.topEndProducts);
    this.topBidProducts$ = store.select(state => state.product.topBidProducts);
    this.topPriceProducts$ = store.select(state => state.product.topPriceProducts);
  }

  ngAfterContentInit(): void {
    this.store.dispatch(findTopEndProducts());
    this.store.dispatch(findTopBidProducts());
    this.store.dispatch(findTopPriceProducts());
  }

  ngOnDestroy(): void {
    this.store.dispatch(destroyProducts());
  }

}
