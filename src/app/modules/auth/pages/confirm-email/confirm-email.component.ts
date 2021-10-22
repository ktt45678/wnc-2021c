import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../core/store';
import { confirmEmail, sendConfirmationEmail } from '../../../../core/store/auth';
import { DestroyService } from '../../../../core/services/destroy.service';
import { StoreStatus } from '../../../../core/enums/store-status.enum';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmEmailComponent implements OnInit {
  StoreStatus = StoreStatus;
  hasCode: boolean = false;
  sendConfirmationEmailForm: FormGroup;

  sendConfirmationEmailStatus$: Observable<StoreStatus>;
  confirmEmailStatus$: Observable<StoreStatus>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private destroyService: DestroyService) {
    this.sendConfirmationEmailForm = new FormGroup({
      reCaptcha: new FormControl('', [Validators.required])
    });
    this.sendConfirmationEmailStatus$ = store.select(state => state.auth.sendConfirmationEmailStatus);
    this.confirmEmailStatus$ = store.select(state => state.auth.confirmEmailStatus);
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroyService)).subscribe(queryParams => {
      if (queryParams.id && queryParams.code) {
        this.hasCode = true;
        this.store.dispatch(confirmEmail({ id: Number(queryParams.id), code: queryParams.code }));
      }
    });
    this.sendConfirmationEmailStatus$.pipe(takeUntil(this.destroyService)).subscribe(status => {
      if (status === StoreStatus.SUCCESS || status === StoreStatus.FAILURE)
        this.sendConfirmationEmailForm.controls.reCaptcha?.reset();
    });
  }

  onSendConfirmationEmail() {
    if (this.sendConfirmationEmailForm.invalid)
      return;
    this.store.dispatch(sendConfirmationEmail(this.sendConfirmationEmailForm.value));
  }

}
