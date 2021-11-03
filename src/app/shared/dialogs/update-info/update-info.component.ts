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
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss'],
  providers: [DestroyService]
})
export class UpdateInfoComponent implements OnInit {
  StoreStatus = StoreStatus;
  maxBirthdate: Date = new Date();
  updateInfoForm: FormGroup;
  updateUserStatus: StoreStatus = StoreStatus.INIT;

  updateUserStatus$: Observable<StoreStatus>;

  constructor(public dialogRef: MatDialogRef<UpdateInfoComponent>, @Inject(MAT_DIALOG_DATA) private user: User,
    private store: Store<AppState>, private destroyService: DestroyService) {
    this.updateInfoForm = new FormGroup({
      fullName: new FormControl(null, [Validators.minLength(3), Validators.maxLength(50)]),
      birthdate: new FormControl(null),
      address: new FormControl(null, [Validators.minLength(3), Validators.maxLength(200)])
    });
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
  }

  onUpdateInfoSubmit(): void {
    if (this.updateInfoForm.invalid)
      return;
    if (!Object.keys(this.updateInfoForm.value).length) {
      this.onClose();
      return;
    }
    this.store.dispatch(updateUser({ id: this.user._id, ...this.updateInfoForm.value }));
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
