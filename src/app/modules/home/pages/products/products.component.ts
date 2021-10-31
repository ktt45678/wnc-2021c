import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { Role } from '../../../../core/enums/role.enum';
import { IoEvent } from '../../../../core/enums/io-event.enum';
import { AppState } from '../../../../core/store';
import { Bid, Product, User } from '../../../../core/models';
import { destroyProducts, findOneProduct, findOneProductSuccess, findRelatedProducts, updateProduct } from '../../../../core/store/product';
import { findCurrentUser } from '../../../../core/store/user';
import { DestroyService } from '../../../../core/services/destroy.service';
import { approveBid, createBid, denyBid, requestBid } from 'src/app/core/store/bid';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [DestroyService]
})
export class ProductsComponent implements AfterContentInit, OnDestroy {
  StoreStatus = StoreStatus;
  Role = Role;
  updateProductForm: FormGroup;
  createBidForm: FormGroup;
  productId?: number;
  minBidPrice: number = 1000;
  bidDataSource?: MatTableDataSource<Bid>;
  blacklistDataSource?: MatTableDataSource<User>;
  whitelistDataSource?: MatTableDataSource<User>;
  requestedUsersDataSource?: MatTableDataSource<User>;
  bidderListColumns: string[] = ['_id', 'fullName', 'point', 'actions'];
  blackWhiteListColumns: string[] = ['_id', 'fullName', 'point'];
  bidHistoryListColumns: string[] = ['_id', 'fullName', 'point', 'price'];

  findOneProductStatus$: Observable<StoreStatus>;
  findRelatedProductsStatus$: Observable<StoreStatus>;
  updateProductStatus$: Observable<StoreStatus>;
  findCurrentUserStatus$: Observable<StoreStatus>;
  createBidStatus$: Observable<StoreStatus>;
  requestBidStatus$: Observable<StoreStatus>;
  approveBidStatus$: Observable<StoreStatus>;
  denyBidStatus$: Observable<StoreStatus>;
  product$: Observable<Product | null>;
  relatedProduct$: Observable<Product[]>;
  accessToken$: Observable<string | null>;
  currentUser$: Observable<User | null>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router, private socket: Socket,
    private destroyService: DestroyService) {
    this.updateProductForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10000)])
    });
    this.createBidForm = new FormGroup({
      price: new FormControl('')
    });
    this.findOneProductStatus$ = store.select(state => state.product.findOneProductStatus);
    this.findRelatedProductsStatus$ = store.select(state => state.product.findRelatedProductsStatus);
    this.updateProductStatus$ = store.select(state => state.product.updateProductStatus);
    this.findCurrentUserStatus$ = store.select(state => state.user.findCurrentUserStatus);
    this.createBidStatus$ = store.select(state => state.bid.createBidStatus);
    this.requestBidStatus$ = store.select(state => state.bid.requestBidStatus);
    this.approveBidStatus$ = store.select(state => state.bid.approveBidStatus);
    this.denyBidStatus$ = store.select(state => state.bid.denyBidStatus);
    this.product$ = store.select(state => state.product.product);
    this.relatedProduct$ = store.select(state => state.product.relatedProducts);
    this.accessToken$ = store.select(state => state.auth.accessToken);
    this.currentUser$ = store.select(state => state.user.currentUser);
  }

  ngAfterContentInit(): void {
    this.route.params.pipe(takeUntil(this.destroyService)).subscribe(params => {
      this.productId = +params.id;
      if (!isNaN(this.productId)) {
        this.store.dispatch(findOneProduct({ id: this.productId }));
        this.socket.emit(IoEvent.PRODUCTS_VIEW_JOIN, { id: this.productId });
      }
    });
    this.findOneProductStatus$.pipe(switchMap(status => (status === StoreStatus.SUCCESS ? this.product$ : of(null))), takeUntil(this.destroyService)).subscribe(product => {
      if (product) {
        if (product.category)
          this.store.dispatch(findRelatedProducts({ category: product.category._id, except: product._id }));
        this.bidDataSource = new MatTableDataSource(product.bids);
        this.blacklistDataSource = new MatTableDataSource(product.blacklist);
        this.whitelistDataSource = new MatTableDataSource(product.whitelist);
        this.requestedUsersDataSource = new MatTableDataSource(product.requestedUsers);
        this.minBidPrice = !product.winner ? product.startingPrice : product.displayPrice + product.priceStep;
        this.createBidForm.get('price')?.setValidators([Validators.required, Validators.min(this.minBidPrice), Validators.max(100_000_000_000)]);
      }
    });
    this.updateProductStatus$.pipe(takeUntil(this.destroyService)).subscribe(status => {
      if (status === StoreStatus.SUCCESS)
        this.updateProductForm.reset();
    });
    this.accessToken$.pipe(first(), tap(token => {
      if (token)
        this.store.dispatch(findCurrentUser());
    })).subscribe();
    this.socket.fromEvent<Product>(IoEvent.PRODUCT_VIEW_REFRESH).pipe(tap(product => {
      this.loadProductFromSocket(product);
    }), takeUntil(this.destroyService)).subscribe();
    this.socket.fromEvent(IoEvent.PRODUCT_VIEW_REMOVE).pipe(tap(() => {
      this.router.navigate(['/home']);
    }), takeUntil(this.destroyService)).subscribe();
  }

  ngOnDestroy(): void {
    if (this.productId)
      this.socket.emit(IoEvent.PRODUCTS_VIEW_LEAVE, { id: this.productId });
    this.store.dispatch(destroyProducts());
  }

  loadProductFromSocket(product: Product): void {
    if (this.productId)
      this.store.dispatch(findOneProductSuccess({ payload: product }));
  }

  onUpdateProductSubmit(): void {
    if (this.updateProductForm.invalid)
      return;
    if (this.productId)
      this.store.dispatch(updateProduct({ id: this.productId, ...this.updateProductForm.value }));
  }

  onCreateBidSubmit(): void {
    if (this.createBidForm.invalid)
      return;
    if (this.productId)
      this.store.dispatch(createBid({ id: this.productId, ...this.createBidForm.value }));
  }

  onRequestBid(): void {
    if (this.productId)
      this.store.dispatch(requestBid({ id: this.productId }));
  }

  onApproveBid(user: number, accept: boolean): void {
    if (this.productId)
      this.store.dispatch(approveBid({ id: this.productId, user: user, accept: accept }));
  }

  onDenyBid(user: number): void {
    if (this.productId)
      this.store.dispatch(denyBid({ id: this.productId, user: user }));
  }

  trackProduct(index: number, item: any) {
    return item?._id || null;
  }

}
