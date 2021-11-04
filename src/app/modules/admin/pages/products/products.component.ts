import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';

import { DestroyService } from '../../../../core/services/destroy.service';
import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { AppState } from '../../../../core/store';
import { Product, Paginated } from '../../../../core/models';
import { destroyProducts, findAllProducts } from '../../../../core/store/product';
import { RemoveProductComponent } from '../../dialogs/remove-product/remove-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [DestroyService]
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  StoreStatus = StoreStatus;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef;

  displayedColumns: string[] = ['_id', 'name', 'category', 'startingPrice', 'priceStep', 'buyPrice', 'seller', 'expiry', 'actions'];
  productDataSource?: MatTableDataSource<Product>;
  totalProducts?: number;
  defaultSort: Sort = { active: '_id', direction: 'asc' };

  productList$: Observable<Paginated<Product>>;
  removeProductStatus$: Observable<StoreStatus>;

  constructor(private store: Store<AppState>, private dialog: MatDialog, private destroyService: DestroyService) {
    this.productList$ = store.select(state => state.product.productList);
    this.removeProductStatus$ = store.select(state => state.product.removeProductStatus);
    this.productList$.pipe(takeUntil(this.destroyService)).subscribe(paginatedProduct => {
      this.initializeData(paginatedProduct.results);
      this.totalProducts = paginatedProduct.totalResults;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadProducts();
    const search$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(200), distinctUntilChanged(), tap(() => this.paginator.pageIndex = 0));
    const sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0));
    const removeProductSuccess$ = this.removeProductStatus$.pipe(filter(status => status === StoreStatus.SUCCESS));
    merge(search$, sort$, this.paginator.page, removeProductSuccess$).pipe(
      tap(() => this.loadProducts()),
      takeUntil(this.destroyService)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.store.dispatch(destroyProducts());
  }

  private loadProducts(): void {
    this.store.dispatch(findAllProducts({
      page: this.paginator.pageIndex + 1,
      limit: this.paginator.pageSize,
      search: this.searchInput.nativeElement.value || null,
      sort: `${this.sort.direction}(${this.sort.active})`
    }));
  }

  private initializeData(products: Product[]): void {
    this.productDataSource = new MatTableDataSource(products);
  }

  removeProductDialog(product: Product) {
    this.dialog.open(RemoveProductComponent, {
      width: '350px',
      data: product
    });
  }
}
