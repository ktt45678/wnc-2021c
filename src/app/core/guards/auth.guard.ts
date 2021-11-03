import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { StoreStatus } from '../enums/store-status.enum';
import { AppState } from '../store';
import { findCurrentUser } from '../store/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private store: Store<AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles: string[] = route.data.roles;
    const fromJwt: boolean = route.data.fromJwt;
    if (fromJwt) {
      return this.store.select(state => state.auth.user).pipe(map(user => {
        if (!user) {
          this.router.navigate(['/auth', 'sign-in']);
          return false;
        }
        if (roles && !roles.includes(user.role)) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      }));
    }
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.router.navigate(['/auth', 'sign-in']);
      return false;
    }
    this.store.dispatch(findCurrentUser());
    return this.store.select(state => state.user.findCurrentUserStatus).pipe(
      filter(status => status === StoreStatus.SUCCESS),
      take(1),
      switchMap(() => this.store.select(state => state.user.currentUser)),
      map(user => {
        if (!user)
          return false;
        if (roles && !roles.includes(user.role)) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      }));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const roles: string[] = childRoute.data.roles;
    const fromJwt: boolean = childRoute.data.fromJwt;
    if (fromJwt) {
      return this.store.select(state => state.auth.user).pipe(map(user => {
        if (!user) {
          this.router.navigate(['/auth', 'sign-in']);
          return false;
        }
        if (roles && !roles.includes(user.role)) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      }));
    }
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.router.navigate(['/auth', 'sign-in']);
      return false;
    }
    this.store.dispatch(findCurrentUser());
    return this.store.select(state => state.user.findCurrentUserStatus).pipe(
      filter(status => status === StoreStatus.SUCCESS),
      take(1),
      switchMap(() => this.store.select(state => state.user.currentUser)),
      map(user => {
        if (!user)
          return false;
        if (roles && !roles.includes(user.role)) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      }));
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const roles: string[] = route.data?.roles;
    const fromJwt: boolean = route.data?.fromJwt;
    if (fromJwt) {
      return this.store.select(state => state.auth.user).pipe(map(user => {
        if (!user)
          return false;
        if (roles && !roles.includes(user.role))
          return false;
        return true;
      }));
    }
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken)
      return false;
    this.store.dispatch(findCurrentUser());
    return this.store.select(state => state.user.findCurrentUserStatus).pipe(
      filter(status => status === StoreStatus.SUCCESS),
      take(1),
      switchMap(() => this.store.select(state => state.user.currentUser)),
      map(user => {
        if (!user)
          return false;
        if (roles && !roles.includes(user.role))
          return false;
        return true;
      }));
  }

}
