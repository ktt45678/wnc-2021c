import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { AppState } from '../../../../core/store';
import { findCurrentUser } from '../../../../core/store/user';
import { UpdateInfoComponent } from '../../../../shared/dialogs/update-info/update-info.component';
import { UpdateEmailComponent } from '../../../../shared/dialogs/update-email/update-email.component';
import { UpdatePasswordComponent } from '../../../../shared/dialogs/update-password/update-password.component';
import { User } from '../../../../core/models';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  StoreStatus = StoreStatus;

  findCurrentUserStatus$: Observable<StoreStatus>;
  currentUser$: Observable<User | null>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.findCurrentUserStatus$ = store.select(state => state.user.findCurrentUserStatus);
    this.currentUser$ = store.select(state => state.user.currentUser);
  }

  ngOnInit(): void {
    this.store.dispatch(findCurrentUser());
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

}
