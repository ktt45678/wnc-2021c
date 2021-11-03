import { AfterContentInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { merge, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { Role } from '../../../../core/enums/role.enum';
import { IoEvent } from '../../../../core/enums/io-event.enum';
import { RatingType } from '../../../../core/enums/rating-type.enum';
import { AppState } from '../../../../core/store';
import { Paginated, Product, Rating, User } from '../../../../core/models';
import { findCurrentUser, destroyUsers } from '../../../../core/store/user';
import { findBiddedProducts, findFavoriteProducts, findSaleProducts, findWinningProducts } from '../../../../core/store/product';
import { findAllRatings } from '../../../../core/store/rating';
import { UpdateInfoComponent } from '../../../../shared/dialogs/update-info/update-info.component';
import { UpdateEmailComponent } from '../../../../shared/dialogs/update-email/update-email.component';
import { UpdatePasswordComponent } from '../../../../shared/dialogs/update-password/update-password.component';
import { RequestUpgradeComponent } from '../../dialogs/request-upgrade/request-upgrade.component';
import { DestroyService } from '../../../../core/services/destroy.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  providers: [DestroyService]
})
export class ProfilesComponent implements AfterViewInit, AfterContentInit {
  @ViewChild('ratingPaginator') ratingPaginator!: MatPaginator;
  @ViewChild('salePaginator') salePaginator!: MatPaginator;
  @ViewChild('biddedPaginator') biddedPaginator!: MatPaginator;
  @ViewChild('winningPaginator') winningPaginator!: MatPaginator;
  @ViewChild('favoritePaginator') favoritePaginator!: MatPaginator;
  @ViewChild('saleSelect') saleSelect!: MatSelect;

  StoreStatus = StoreStatus;
  Role = Role;
  RatingType = RatingType;

  findCurrentUserStatus$: Observable<StoreStatus>;
  findAllRatingsStatus$: Observable<StoreStatus>;
  findSaleProductsStatus$: Observable<StoreStatus>;
  findBiddedProductsStatus$: Observable<StoreStatus>;
  findWinningProductsStatus$: Observable<StoreStatus>;
  findFavoriteProductsStatus$: Observable<StoreStatus>;
  currentUser$: Observable<User | null>;
  ratingList$: Observable<Paginated<Rating>>;
  saleProducts$: Observable<Paginated<Product>>;
  biddedProducts$: Observable<Paginated<Product>>;
  winningProducts$: Observable<Paginated<Product>>;
  favoriteProducts$: Observable<Paginated<Product>>;

  constructor(private store: Store<AppState>, private socket: Socket,
    private dialog: MatDialog, private destroyService: DestroyService) {
    this.findCurrentUserStatus$ = store.select(state => state.user.findCurrentUserStatus);
    this.findAllRatingsStatus$ = store.select(state => state.rating.findAllRatingsStatus);
    this.findSaleProductsStatus$ = store.select(state => state.product.findSaleProductsStatus);
    this.findBiddedProductsStatus$ = store.select(state => state.product.findBiddedProductsStatus);
    this.findWinningProductsStatus$ = store.select(state => state.product.findWinningProductsStatus);
    this.findFavoriteProductsStatus$ = store.select(state => state.product.findFavoriteProductsStatus);
    this.currentUser$ = store.select(state => state.user.currentUser);
    this.ratingList$ = store.select(state => state.rating.ratingList);
    this.saleProducts$ = store.select(state => state.product.saleProducts);
    this.biddedProducts$ = store.select(state => state.product.biddedProducts);
    this.winningProducts$ = store.select(state => state.product.winningProducts);
    this.favoriteProducts$ = store.select(state => state.product.favoriteProducts);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.findAllRatings();
      this.findSaleProducts();
      this.findBiddedProducts();
      this.findWinningProducts();
      this.findFavoriteProducts();
      this.ratingPaginator.page.pipe(tap(() => this.findAllRatings()), takeUntil(this.destroyService)).subscribe();
      this.biddedPaginator.page.pipe(tap(() => this.findBiddedProducts()), takeUntil(this.destroyService)).subscribe();
      this.winningPaginator.page.pipe(tap(() => this.findWinningProducts()), takeUntil(this.destroyService)).subscribe();
      this.favoritePaginator.page.pipe(tap(() => this.findFavoriteProducts()), takeUntil(this.destroyService)).subscribe();
      const saleSelect$ = this.saleSelect.selectionChange.pipe(distinctUntilChanged(), tap(() => this.salePaginator.pageIndex = 0));
      merge(saleSelect$, this.salePaginator.page).pipe(tap(() => this.findSaleProducts()), takeUntil(this.destroyService)).subscribe();
    }, 0);
  }

  ngAfterContentInit(): void {
    this.store.dispatch(findCurrentUser());
  }

  findAllRatings(): void {
    this.store.dispatch(findAllRatings({
      page: this.ratingPaginator.pageIndex + 1,
      limit: this.ratingPaginator.pageSize
    }));
  }

  findSaleProducts(): void {
    const ended = this.saleSelect.value === '0' ? undefined : ['2', '3'].includes(this.saleSelect.value);
    this.store.dispatch(findSaleProducts({
      page: this.salePaginator.pageIndex + 1,
      limit: this.salePaginator.pageSize,
      ended: ended,
      saleFilter: this.saleSelect.value
    }));
  }

  findBiddedProducts(): void {
    this.store.dispatch(findBiddedProducts({
      page: this.biddedPaginator.pageIndex + 1,
      limit: this.biddedPaginator.pageSize
    }));
  }

  findWinningProducts(): void {
    this.store.dispatch(findWinningProducts({
      page: this.winningPaginator.pageIndex + 1,
      limit: this.winningPaginator.pageSize
    }));
  }

  findFavoriteProducts(): void {
    this.store.dispatch(findFavoriteProducts({
      page: this.favoritePaginator.pageIndex + 1,
      limit: this.favoritePaginator.pageSize
    }));
  }

  updateInfoDialog(user: User) {
    this.dialog.open(UpdateInfoComponent, {
      width: '450px',
      data: user
    });
  }

  updateEmailDialog(user: User) {
    this.dialog.open(UpdateEmailComponent, {
      width: '450px',
      data: user
    });
  }

  updatePasswordDialog(user: User) {
    this.dialog.open(UpdatePasswordComponent, {
      width: '450px',
      data: user
    });
  }

  requestUpgradeDialog(user: User) {
    this.dialog.open(RequestUpgradeComponent, {
      width: '450px',
      data: user
    });
  }

}
