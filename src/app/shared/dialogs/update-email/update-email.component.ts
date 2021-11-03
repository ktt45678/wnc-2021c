import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from '../../../core/models';
import { AppState } from '../../../core/store';
import { resetUpdateUser, updateUser } from '../../../core/store/user';
import { StoreStatus } from '../../../core/enums/store-status.enum';
import { DestroyService } from '../../../core/services/destroy.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss'],
  providers: [DestroyService]
})
export class UpdateEmailComponent implements OnInit {
  StoreStatus = StoreStatus;
  updateEmailForm: FormGroup;
  updateUserStatus: StoreStatus = StoreStatus.INIT;

  updateUserStatus$: Observable<StoreStatus>;

  constructor(public dialogRef: MatDialogRef<UpdateEmailComponent>, @Inject(MAT_DIALOG_DATA) private user: User,
    private store: Store<AppState>, private destroyService: DestroyService) {
    this.updateEmailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      currentPassword: new FormControl('', [Validators.required])
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

  onUpdateEmailSubmit(): void {
    if (this.updateEmailForm.invalid)
      return;
    this.store.dispatch(updateUser({ id: this.user._id, ...this.updateEmailForm.value }));
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
