import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from '../../../../core/models';
import { AppState } from '../../../../core/store';
import { resetUpdateUser, updateUser } from '../../../../core/store/user';
import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { DestroyService } from '../../../../core/services/destroy.service';

@Component({
  selector: 'app-request-upgrade',
  templateUrl: './request-upgrade.component.html',
  styleUrls: ['./request-upgrade.component.scss'],
  providers: [DestroyService]
})
export class RequestUpgradeComponent implements OnInit {
  StoreStatus = StoreStatus;
  requestUpgradeForm: FormGroup;
  updateUserStatus: StoreStatus = StoreStatus.INIT;

  updateUserStatus$: Observable<StoreStatus>;

  constructor(public dialogRef: MatDialogRef<RequestUpgradeComponent>, @Inject(MAT_DIALOG_DATA) private user: User,
    private store: Store<AppState>, private destroyService: DestroyService) {
    this.requestUpgradeForm = new FormGroup({
      agree: new FormControl(false, [Validators.requiredTrue])
    });
    this.updateUserStatus$ = store.select(state => state.user.updateUserStatus);
  }

  ngOnInit(): void {
    this.updateUserStatus$.pipe(takeUntil(this.destroyService)).subscribe(status => {
      this.updateUserStatus = status
      if (status === StoreStatus.SUCCESS) {
        this.store.dispatch(resetUpdateUser());
        this.onClose();
      }
    });
  }

  onRequestUpgradeSubmit(): void {
    if (this.requestUpgradeForm.invalid)
      return;
    this.store.dispatch(updateUser({ id: this.user._id, requestUpgrade: true }));
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
