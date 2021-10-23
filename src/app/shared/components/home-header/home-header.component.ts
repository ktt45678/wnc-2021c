import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../../core/store';
import { User } from '../../../../app/core/models';
import { signOut } from '../../../../app/core/store/auth';
import { Role } from '../../../core/enums/role.enum';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeHeaderComponent implements OnInit {
  Role = Role;

  isNavOpen: boolean = false;

  user$: Observable<User | null>

  constructor(private store: Store<AppState>) {
    this.user$ = store.select(state => state.auth.user);
  }

  ngOnInit(): void {
  }

  onSignOut() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken)
      this.store.dispatch(signOut({ token: refreshToken }));
  }

}
