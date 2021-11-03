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
import { controlMatches } from '../../../core/validators/control-matches.validator';
import { DestroyService } from '../../../core/services/destroy.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  providers: [DestroyService]
})
export class UpdatePasswordComponent implements OnInit {
  StoreStatus = StoreStatus;
  updatePasswordForm: FormGroup;
  updateUserStatus: StoreStatus = StoreStatus.INIT;
  hidePassword: boolean = true;

  updateUserStatus$: Observable<StoreStatus>;

  constructor(public dialogRef: MatDialogRef<UpdatePasswordComponent>, @Inject(MAT_DIALOG_DATA) private user: User,
    private store: Store<AppState>, private destroyService: DestroyService) {
    this.updatePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: controlMatches('confirmPassword', 'password')
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

  onUpdatePasswordSubmit(): void {
    if (this.updatePasswordForm.invalid)
      return;
    this.store.dispatch(updateUser({ id: this.user._id, ...this.updatePasswordForm.value }));
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
