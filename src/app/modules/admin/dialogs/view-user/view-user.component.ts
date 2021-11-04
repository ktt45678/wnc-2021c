import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { User } from '../../../../core/models';
import { AppState } from '../../../../core/store';
import { findOneUser, resetFindOneUser, resetUpdateUser, updateUser } from '../../../../core/store/user';
import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { DestroyService } from '../../../../core/services/destroy.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  providers: [DestroyService]
})
export class ViewUserComponent implements OnInit {
  StoreStatus = StoreStatus;
  findOneUserStatus: StoreStatus = StoreStatus.INIT;

  findOneUserStatus$: Observable<StoreStatus>;
  selectedUser$: Observable<User | null>;

  constructor(public dialogRef: MatDialogRef<ViewUserComponent>, @Inject(MAT_DIALOG_DATA) private user: User,
    private store: Store<AppState>, private destroyService: DestroyService) {
    this.selectedUser$ = store.select(state => state.user.selectedUser);
    this.findOneUserStatus$ = store.select(state => state.user.findOneUserStatus);
  }

  ngOnInit(): void {
    this.findOneUserStatus$.pipe(
      tap(status => this.findOneUserStatus = status),
      takeUntil(this.destroyService)
    ).subscribe();
    this.store.dispatch(findOneUser({ id: this.user._id }));
  }

  onClose(): void {
    this.store.dispatch(resetFindOneUser());
    this.dialogRef.close();
  }
}
