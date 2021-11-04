import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';

import { User } from '../../../../core/models';
import { AppState } from '../../../../core/store';
import { findOneUser, resetFindOneUser, resetUpdateUser, updateUser } from '../../../../core/store/user';
import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { DestroyService } from '../../../../core/services/destroy.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers: [DestroyService]
})
export class UpdateUserComponent implements OnInit {
  StoreStatus = StoreStatus;
  maxBirthdate: Date = new Date();
  updateUserForm: FormGroup;
  updateUserStatus: StoreStatus = StoreStatus.INIT;
  findOneUserStatus: StoreStatus = StoreStatus.INIT;

  findOneUserStatus$: Observable<StoreStatus>;
  updateUserStatus$: Observable<StoreStatus>;
  selectedUser$: Observable<User | null>;

  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>, @Inject(MAT_DIALOG_DATA) private user: User,
    private store: Store<AppState>, private destroyService: DestroyService) {
    this.updateUserForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      fullName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      birthdate: new FormControl(null),
      address: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      banned: new FormControl(false)
    });
    this.selectedUser$ = store.select(state => state.user.selectedUser);
    this.findOneUserStatus$ = store.select(state => state.user.findOneUserStatus);
    this.updateUserStatus$ = store.select(state => state.user.updateUserStatus);
  }

  ngOnInit(): void {
    this.updateUserStatus$.pipe(takeUntil(this.destroyService)).subscribe(status => {
      this.updateUserStatus = status;
      if (status === StoreStatus.SUCCESS) {
        this.store.dispatch(resetUpdateUser());
        this.onClose();
      }
    });
    this.findOneUserStatus$.pipe(
      tap(status => this.findOneUserStatus = status),
      filter(status => status === StoreStatus.SUCCESS),
      switchMap(() => this.selectedUser$),
      tap(user => {
        if (user) {
          this.updateUserForm.patchValue({
            email: user.email,
            fullName: user.fullName,
            birthdate: user.birthdate ? new Date(user.birthdate) : null,
            address: user.address,
            banned: user.banned
          })
        }
      }),
      takeUntil(this.destroyService)
    ).subscribe();
    this.store.dispatch(findOneUser({ id: this.user._id }));
  }

  onUpdateUserSubmit(): void {
    if (this.updateUserForm.invalid)
      return;
    if (!Object.keys(this.updateUserForm.value).length) {
      this.onClose();
      return;
    }
    this.store.dispatch(updateUser({ id: this.user._id, ...this.updateUserForm.value }));
  }

  onClose(): void {
    this.store.dispatch(resetFindOneUser());
    this.dialogRef.close();
  }
}
