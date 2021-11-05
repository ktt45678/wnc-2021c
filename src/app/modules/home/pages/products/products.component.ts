import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { cloneDeep } from 'lodash';

import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { Role } from '../../../../core/enums/role.enum';
import { IoEvent } from '../../../../core/enums/io-event.enum';
import { RatingType } from '../../../../core/enums/rating-type.enum';
import { AppState } from '../../../../core/store';
import { Bid, Product, User } from '../../../../core/models';
import { destroyProducts, findOneProduct, findRelatedProducts, updateProduct } from '../../../../core/store/product';
import { destroyUsers, findCurrentUser } from '../../../../core/store/user';
import { approveBid, createBid, denyBid, requestBid } from '../../../../core/store/bid';
import { createRating } from '../../../../core/store/rating';
import { DestroyService } from '../../../../core/services/destroy.service';
import { addToFavorite, removeFromFavorite } from '../../../../core/store/favorite';
import { CancelPaymentComponent } from '../../dialogs/cancel-payment/cancel-payment.component';
import { ConfirmBidComponent } from '../../dialogs/confirm-bid/confirm-bid.component';
import { ViewImageComponent } from '../../dialogs/view-image/view-image.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [DestroyService]
})
export class ProductsComponent implements OnInit, AfterContentInit, OnDestroy {
  StoreStatus = StoreStatus;
  Role = Role;
  RatingType = RatingType;
  product?: Product | null;
  currentUser?: User | null;
  updateProductForm: FormGroup;
  createBidForm: FormGroup;
  createRatingForm: FormGroup;
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
  createRatingStatus$: Observable<StoreStatus>;
  product$: Observable<Product | null>;
  relatedProduct$: Observable<Product[]>;
  accessToken$: Observable<string | null>;
  currentUser$: Observable<User | null>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router, private socket: Socket,
    private dialog: MatDialog, private destroyService: DestroyService) {
    this.updateProductForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10000)])
    });
    this.createBidForm = new FormGroup({
      price: new FormControl('')
    });
    this.createRatingForm = new FormGroup({
      ratingType: new FormControl(null, [Validators.required]),
      comment: new FormControl('', [Validators.maxLength(2000)])
    });
    this.findOneProductStatus$ = store.select(state => state.product.findOneProductStatus);
    this.findRelatedProductsStatus$ = store.select(state => state.product.findRelatedProductsStatus);
    this.updateProductStatus$ = store.select(state => state.product.updateProductStatus);
    this.findCurrentUserStatus$ = store.select(state => state.user.findCurrentUserStatus);
    this.createBidStatus$ = store.select(state => state.bid.createBidStatus);
    this.requestBidStatus$ = store.select(state => state.bid.requestBidStatus);
    this.approveBidStatus$ = store.select(state => state.bid.approveBidStatus);
    this.denyBidStatus$ = store.select(state => state.bid.denyBidStatus);
    this.createRatingStatus$ = store.select(state => state.rating.createRatingStatus);
    this.product$ = store.select(state => state.product.product);
    this.relatedProduct$ = store.select(state => state.product.relatedProducts);
    this.accessToken$ = store.select(state => state.auth.accessToken);
    this.currentUser$ = store.select(state => state.user.currentUser);
  }

  ngOnInit(): void {
    this.product$.pipe(takeUntil(this.destroyService)).subscribe(product => {
      this.product = cloneDeep(product);
    });
    this.currentUser$.pipe(takeUntil(this.destroyService)).subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  ngAfterContentInit(): void {
    this.route.params.pipe(takeUntil(this.destroyService)).subscribe(params => {
      this.productId = +params.id;
      if (!isNaN(this.productId)) {
        this.store.dispatch(findOneProduct({ id: this.productId }));
        this.socket.emit(IoEvent.PRODUCTS_VIEW_JOIN, { id: this.productId });
      }
    });
    this.findOneProductStatus$.pipe(
      filter((status => status === StoreStatus.SUCCESS)),
      switchMap(() => this.product$),
      tap(product => {
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
      }),
      takeUntil(this.destroyService)).subscribe();
    this.updateProductStatus$.pipe(
      filter(status => status === StoreStatus.SUCCESS),
      tap(() => this.updateProductForm.reset()),
      takeUntil(this.destroyService)).subscribe();
    this.accessToken$.pipe(first(), tap(token => {
      if (token)
        this.store.dispatch(findCurrentUser());
    })).subscribe();
    this.socket.fromEvent(IoEvent.PRODUCT_VIEW_REFRESH).pipe(tap(() => {
      if (this.productId)
        this.store.dispatch(findOneProduct({ id: this.productId }));
    }), takeUntil(this.destroyService)).subscribe();
    this.socket.fromEvent(IoEvent.PRODUCT_VIEW_REMOVE).pipe(tap(() => {
      this.router.navigate(['/home']);
    }), takeUntil(this.destroyService)).subscribe();
  }

  ngOnDestroy(): void {
    if (this.productId)
      this.socket.emit(IoEvent.PRODUCTS_VIEW_LEAVE, { id: this.productId });
    this.store.dispatch(destroyProducts());
    this.store.dispatch(destroyUsers());
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
    if (this.productId) {
      const dialogRef = this.dialog.open(ConfirmBidComponent, {
        width: '450px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(createBid({ id: this.productId, ...this.createBidForm.value }));
        }
      });
    }
  }

  onCreateRatingSubmit(): void {
    if (this.createRatingForm.invalid)
      return;
    if (this.productId)
      this.store.dispatch(createRating({ id: this.productId, ...this.createRatingForm.value }));
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

  onFavorite(): void {
    if (!this.currentUser) {
      this.router.navigate(['/auth', 'sign-in']);
      return;
    }
    if (this.product) {
      if (!this.product.favorited) {
        this.product.favorited = true;
        this.store.dispatch(addToFavorite({ id: this.product._id }));
      } else {
        this.product.favorited = false;
        this.store.dispatch(removeFromFavorite({ id: this.product._id }));
      }
    }
  }

  cancelPaymentDialog(): void {
    const dialogRef = this.dialog.open(CancelPaymentComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.productId && result) {
        this.store.dispatch(createRating({
          id: this.productId,
          ratingType: RatingType.NEGATIVE,
          comment: 'Người thắng không thanh toán'
        }));
      }
    });
  }

  viewImageDialog(url: string): void {
    this.dialog.open(ViewImageComponent, {
      width: '50%',
      data: url
    });
  }

  trackProduct(index: number, item: any) {
    return item?._id || null;
  }

}
