import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { AppState } from '../../../../core/store';
import { CategoryGroup, Paginated, Product } from '../../../../core/models';
import { destroyProducts, findAllProducts } from '../../../../core/store/product';
import { DestroyService } from '../../../../core/services/destroy.service';

@Component({
  selector: 'app-find-products',
  templateUrl: './find-products.component.html',
  styleUrls: ['./find-products.component.scss'],
  providers: [DestroyService]
})
export class FindProductsComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  StoreStatus = StoreStatus;
  findProductsForm: FormGroup;

  findAllProductsStatus$: Observable<StoreStatus>;
  categoryGroups$: Observable<CategoryGroup[]>;
  productList$: Observable<Paginated<Product>>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private destroyService: DestroyService) {
    this.findProductsForm = new FormGroup({
      search: new FormControl(''),
      category: new FormControl(),
      sort: new FormControl()
    });
    this.findAllProductsStatus$ = store.select(state => state.product.findAllProductsStatus);
    this.categoryGroups$ = store.select(state => state.category.categoryGroups);
    this.productList$ = store.select(state => state.product.productList);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.findProducts();
      this.paginator.page.pipe(tap(() => this.findProducts()), takeUntil(this.destroyService)).subscribe();
      this.route.queryParams.pipe(takeUntil(this.destroyService)).subscribe(queryParams => {
        const categoryValue = +queryParams.category;
        if (!isNaN(categoryValue)) {
          this.findProductsForm.patchValue({
            category: categoryValue
          });
          this.findProducts();
        }
      });
    }, 0);
  }

  ngOnDestroy(): void {
    this.store.dispatch(destroyProducts());
  }

  onFindProductsSubmit(): void {
    if (this.findProductsForm.invalid)
      return;
    this.findProducts();
  }

  findProducts() {
    this.store.dispatch(findAllProducts({
      ...this.findProductsForm.value,
      page: this.paginator.pageIndex + 1,
      limit: this.paginator.pageSize
    }));
  }

  trackId(index: number, item: any) {
    return item?._id || null;
  }
}
