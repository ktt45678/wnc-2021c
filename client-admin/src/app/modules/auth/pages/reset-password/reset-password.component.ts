import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppState } from '../../../../core/store';
import { recoverPassword, resetPassword } from '../../../../core/store/auth';
import { DestroyService } from '../../../../core/services/destroy.service';
import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { controlMatches } from '../../../../core/validators/control-matches.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {
  StoreStatus = StoreStatus;
  hasCode: boolean = false;
  id?: number;
  code?: string;
  recoverPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;

  recoverPasswordStatus$: Observable<StoreStatus>;
  resetPasswordStatus$: Observable<StoreStatus>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private destroyService: DestroyService) {
    this.recoverPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      reCaptcha: new FormControl('', [Validators.required])
    });
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: controlMatches('confirmPassword', 'password')
    });
    this.recoverPasswordStatus$ = store.select(state => state.auth.recoverPasswordStatus);
    this.resetPasswordStatus$ = store.select(state => state.auth.resetPasswordStatus);
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroyService)).subscribe(queryParams => {
      if (queryParams.id && queryParams.code) {
        this.hasCode = true;
        this.id = Number(queryParams.id);
        this.code = queryParams.code;
      }
    });
    this.recoverPasswordStatus$.pipe(takeUntil(this.destroyService)).subscribe(status => {
      if (status === StoreStatus.SUCCESS || status === StoreStatus.FAILURE)
        this.recoverPasswordForm.controls.reCaptcha?.reset();
    });
  }

  onRecoverPassword() {
    if (this.recoverPasswordForm.invalid)
      return;
    this.store.dispatch(recoverPassword(this.recoverPasswordForm.value));
  }

  onResetPassword() {
    if (this.resetPasswordForm.invalid || !this.id || !this.code)
      return;
    this.store.dispatch(resetPassword({ ...this.resetPasswordForm.value, id: this.id, code: this.code }));
  }

}
