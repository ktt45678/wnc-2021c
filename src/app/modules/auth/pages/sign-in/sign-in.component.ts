import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../../../core/store';
import { signIn } from '../../../../core/store/auth';
import { StoreStatus } from '../../../../core/enums/store-status.enum';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  StoreStatus = StoreStatus;
  hidePassword: boolean = true;
  signInForm: FormGroup;

  signInStatus$: Observable<StoreStatus>;

  constructor(private store: Store<AppState>) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.signInStatus$ = store.select(state => state.auth.signInStatus);
  }

  ngOnInit(): void {
  }

  onSignInSubmit() {
    if (this.signInForm.invalid)
      return;
    this.store.dispatch(signIn(this.signInForm.value));
  }

}
