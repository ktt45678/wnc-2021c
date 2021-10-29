import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { AppState } from '../../../../core/store';
import { Product } from '../../../../core/models';
import { destroyProducts, findOneProduct } from '../../../../core/store/product';
import { DestroyService } from '../../../../core/services/destroy.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [DestroyService]
})
export class ProductsComponent implements AfterContentInit, OnDestroy {
  StoreStatus = StoreStatus;

  findOneProductStatus$: Observable<StoreStatus>;
  product$: Observable<Product | null>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private destroyService: DestroyService) {
    this.findOneProductStatus$ = store.select(state => state.product.findOneProductStatus);
    this.product$ = store.select(state => state.product.product);
  }

  ngAfterContentInit(): void {
    this.route.params.pipe(takeUntil(this.destroyService)).subscribe(params => {
      const id = +params.id;
      if (!isNaN(id))
        this.store.dispatch(findOneProduct({ id }));
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(destroyProducts());
  }

  trackProduct(index: number, item: any) {
    return item?._id || null;
  }

}
