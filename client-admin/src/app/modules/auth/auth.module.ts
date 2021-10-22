import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { DisabledControlModule } from '../../core/directives/disabled-control';
import { FormAutofocusModule } from '../../core/directives/form-autofocus';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ConfirmEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    DisabledControlModule,
    FormAutofocusModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ]
})
export class AuthModule { }
