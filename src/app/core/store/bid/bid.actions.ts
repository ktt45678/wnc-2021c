import { createAction, props } from '@ngrx/store';

import { IApproveBid, ICreateBid, IDenyBid } from '../../interfaces/bids';

export const requestBid = createAction(
  '[Bid] Request Bid',
  props<{ id: number }>()
);

export const requestBidSuccess = createAction(
  '[Bid] Request Bid Success'
);

export const requestBidFailure = createAction(
  '[Bid] Request Bid Failure'
);

export const approveBid = createAction(
  '[Bid] Approve Bid',
  props<{ id: number } & IApproveBid>()
);

export const approveBidSuccess = createAction(
  '[Bid] Approve Bid Success'
);

export const approveBidFailure = createAction(
  '[Bid] Approve Bid Failure'
);

export const denyBid = createAction(
  '[Bid] Deny Bid',
  props<{ id: number } & IDenyBid>()
);

export const denyBidSuccess = createAction(
  '[Bid] Deny Bid Success'
);

export const denyBidFailure = createAction(
  '[Bid] Deny Bid Failure'
);

export const createBid = createAction(
  '[Bid] Create Bid',
  props<{ id: number } & ICreateBid>()
);

export const createBidSuccess = createAction(
  '[Bid] Create Bid Success'
);

export const createBidFailure = createAction(
  '[Bid] Create Bid Failure'
);

export const getBidHint = createAction(
  '[Bid] Get Bid Hint',
  props<{ id: number }>()
);

export const getBidHintSuccess = createAction(
  '[Bid] Get Bid Hint Success',
  props<{ price: number }>()
);

export const getBidHintFailure = createAction(
  '[Bid] Get Bid Hint Failure'
);
