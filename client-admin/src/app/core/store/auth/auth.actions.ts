import { createAction, props } from '@ngrx/store';

import { ISignIn, ISignUp, ISendConfirmationEmail, ISignOut, IConfirmEmail, IResetPassword, IRecoverPassword, IRefreshToken } from '../../interfaces/auth';
import { Jwt, User } from '../../models';

export const signIn = createAction(
  '[Auth] Sign In',
  props<ISignIn>()
);

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ tokens: Jwt, user: User | null }>()
);

export const signInFailure = createAction(
  '[Auth] Sign In Failure'
);

export const signUp = createAction(
  '[Auth] Sign Up',
  props<ISignUp>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ tokens: Jwt, user: User | null }>()
);

export const signUpFailure = createAction(
  '[Auth] Sign Up Failure'
);

export const sendConfirmationEmail = createAction(
  '[Auth] Send Confirmation Email',
  props<ISendConfirmationEmail>()
);

export const sendConfirmationEmailSuccess = createAction(
  '[Auth] Send Confirmation Email Success'
);

export const sendConfirmationEmailFailure = createAction(
  '[Auth] Send Confirmation Email Failure'
);

export const confirmEmail = createAction(
  '[Auth] Confirm Email',
  props<IConfirmEmail>()
);

export const confirmEmailSuccess = createAction(
  '[Auth] Confirm Email Success',
  props<{ tokens: Jwt, user: User | null }>()
);

export const confirmEmailFailure = createAction(
  '[Auth] Confirm Email Failure'
);

export const recoverPassword = createAction(
  '[Auth] Recover Password',
  props<IRecoverPassword>()
);

export const recoverPasswordSuccess = createAction(
  '[Auth] Recover Password Success'
);

export const recoverPasswordFailure = createAction(
  '[Auth] Recover Password Failure'
);

export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<IResetPassword>()
);

export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success'
);

export const resetPasswordFailure = createAction(
  '[Auth] Reset Password Failure'
);

export const refreshToken = createAction(
  '[Auth] Refresh Token',
  props<IRefreshToken>()
);

export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ tokens: Jwt, user: User | null }>()
);

export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure'
);

export const signOut = createAction(
  '[Auth] Sign Out',
  props<ISignOut>()
);

export const signOutSuccess = createAction(
  '[Auth] Sign Out Success'
);

export const signOutFailure = createAction(
  '[Auth] Sign Out Failure'
);
