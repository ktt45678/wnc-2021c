import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppState } from '../../../../core/store';
import { signUp } from '../../../../core/store/auth';
import { StoreStatus } from '../../../../core/enums/store-status.enum';
import { controlMatches } from '../../../../core/validators/control-matches.validator';
import { DestroyService } from '../../../../core/services/destroy.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  StoreStatus = StoreStatus;
  hidePassword: boolean = true;
  signUpForm: FormGroup;
  maxBirthdate: Date;

  signUpStatus$: Observable<StoreStatus>;

  constructor(private store: Store<AppState>, private _destroy: DestroyService) {
    this.signUpForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/)]),
      confirmPassword: new FormControl('', [Validators.required]),
      reCaptcha: new FormControl('', [Validators.required])
    }, {
      validators: controlMatches('confirmPassword', 'password')
    });
    this.maxBirthdate = new Date();
    this.signUpStatus$ = store.select(state => state.auth.signUpStatus);
  }

  ngOnInit(): void {
    this.signUpStatus$.pipe(takeUntil(this._destroy)).subscribe(status => {
      if (status === StoreStatus.FAILURE)
        this.signUpForm.controls.reCaptcha?.reset();
    });
  }

  onSignUpSubmit() {
    if (this.signUpForm.invalid)
      return;
    this.store.dispatch(signUp(this.signUpForm.value));
  }
}
