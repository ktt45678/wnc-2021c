import { createReducer, on } from '@ngrx/store';
import jwt_decode from 'jwt-decode';

import { signIn, signInSuccess, signInFailure, signUp, signUpFailure, signUpSuccess, signOut, signOutFailure, signOutSuccess, sendConfirmationEmail, sendConfirmationEmailSuccess, sendConfirmationEmailFailure, confirmEmail, confirmEmailSuccess, confirmEmailFailure, recoverPassword, recoverPasswordSuccess, recoverPasswordFailure, resetPassword, resetPasswordSuccess, resetPasswordFailure, refreshTokenFailure, refreshToken, refreshTokenSuccess } from './auth.actions';
import { StoreStatus } from '../../enums/store-status.enum';
import { User } from '../../models';

export interface AuthState {
  signInStatus: StoreStatus;
  signUpStatus: StoreStatus;
  signOutStatus: StoreStatus;
  confirmEmailStatus: StoreStatus;
  sendConfirmationEmailStatus: StoreStatus;
  recoverPasswordStatus: StoreStatus;
  resetPasswordStatus: StoreStatus;
  refreshTokenStatus: StoreStatus;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

export const initialState: AuthState = {
  signInStatus: StoreStatus.INIT,
  signUpStatus: StoreStatus.INIT,
  signOutStatus: StoreStatus.INIT,
  confirmEmailStatus: StoreStatus.INIT,
  sendConfirmationEmailStatus: StoreStatus.INIT,
  recoverPasswordStatus: StoreStatus.INIT,
  resetPasswordStatus: StoreStatus.INIT,
  refreshTokenStatus: StoreStatus.INIT,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  user: localStorage.getItem('accessToken') ? jwt_decode(localStorage.getItem('accessToken') || '') : null
};

export const authReducer = createReducer(
  initialState,
  on(signIn, (state) => ({
    ...state,
    signInStatus: StoreStatus.LOADING
  })),
  on(signInSuccess, (state, action) => {
    localStorage.setItem('accessToken', action.tokens.accessToken);
    localStorage.setItem('refreshToken', action.tokens.refreshToken);
    return {
      ...state,
      signInStatus: StoreStatus.SUCCESS,
      accessToken: action.tokens.accessToken,
      refreshToken: action.tokens.refreshToken,
      user: action.user
    };
  }),
  on(signInFailure, (state) => ({
    ...state,
    signInStatus: StoreStatus.FAILURE
  })),
  on(signUp, (state) => ({
    ...state,
    signUpStatus: StoreStatus.LOADING
  })),
  on(signUpSuccess, (state) => ({
    ...state,
    signUpStatus: StoreStatus.SUCCESS
  })),
  on(signUpFailure, (state) => ({
    ...state,
    signUpStatus: StoreStatus.FAILURE
  })),
  on(sendConfirmationEmail, (state) => ({
    ...state,
    sendConfirmationEmailStatus: StoreStatus.LOADING
  })),
  on(sendConfirmationEmailSuccess, (state) => ({
    ...state,
    sendConfirmationEmailStatus: StoreStatus.SUCCESS
  })),
  on(sendConfirmationEmailFailure, (state) => ({
    ...state,
    sendConfirmationEmailStatus: StoreStatus.FAILURE
  })),
  on(confirmEmail, (state) => ({
    ...state,
    confirmEmailStatus: StoreStatus.LOADING
  })),
  on(confirmEmailSuccess, (state, action) => {
    localStorage.setItem('accessToken', action.tokens.accessToken);
    localStorage.setItem('refreshToken', action.tokens.refreshToken);
    return {
      ...state,
      confirmEmailStatus: StoreStatus.SUCCESS,
      accessToken: action.tokens.accessToken,
      refreshToken: action.tokens.refreshToken,
      user: action.user
    };
  }),
  on(confirmEmailFailure, (state) => ({
    ...state,
    confirmEmailStatus: StoreStatus.FAILURE
  })),
  on(recoverPassword, (state) => ({
    ...state,
    recoverPasswordStatus: StoreStatus.LOADING
  })),
  on(recoverPasswordSuccess, (state) => ({
    ...state,
    recoverPasswordStatus: StoreStatus.SUCCESS
  })),
  on(recoverPasswordFailure, (state) => ({
    ...state,
    recoverPasswordStatus: StoreStatus.FAILURE
  })),
  on(resetPassword, (state) => ({
    ...state,
    resetPasswordStatus: StoreStatus.LOADING
  })),
  on(resetPasswordSuccess, (state) => ({
    ...state,
    resetPasswordStatus: StoreStatus.SUCCESS
  })),
  on(resetPasswordFailure, (state) => ({
    ...state,
    resetPasswordStatus: StoreStatus.FAILURE
  })),
  on(refreshToken, (state) => ({
    ...state,
    refreshTokenStatus: StoreStatus.LOADING
  })),
  on(refreshTokenSuccess, (state, action) => ({
    ...state,
    refreshTokenStatus: StoreStatus.SUCCESS,
    accessToken: action.tokens.accessToken,
    refreshToken: action.tokens.refreshToken,
    user: action.user
  })),
  on(refreshTokenFailure, (state) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return {
      ...state,
      refreshTokenStatus: StoreStatus.FAILURE,
      accessToken: null,
      refreshToken: null
    };
  }),
  on(signOut, (state) => ({
    ...state,
    signOutStatus: StoreStatus.LOADING
  })),
  on(signOutSuccess, (state) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return {
      ...initialState,
      signOutStatus: StoreStatus.SUCCESS
    };
  }),
  on(signOutFailure, (state) => ({
    ...state,
    signOutStatus: StoreStatus.FAILURE
  }))
);
