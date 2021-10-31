import { createReducer, on } from '@ngrx/store';
import { approveBid, approveBidFailure, approveBidSuccess, createBid, createBidFailure, createBidSuccess, denyBid, denyBidFailure, denyBidSuccess, getBidHint, getBidHintFailure, getBidHintSuccess, requestBid, requestBidFailure, requestBidSuccess } from '.';

import { StoreStatus } from '../../enums/store-status.enum';

export interface BidState {
  requestBidStatus: StoreStatus;
  approveBidStatus: StoreStatus;
  denyBidStatus: StoreStatus;
  createBidStatus: StoreStatus;
  getBidHintStatus: StoreStatus;
  bidHint: number | null;
}

export const initialState: BidState = {
  requestBidStatus: StoreStatus.INIT,
  approveBidStatus: StoreStatus.INIT,
  denyBidStatus: StoreStatus.INIT,
  createBidStatus: StoreStatus.INIT,
  getBidHintStatus: StoreStatus.INIT,
  bidHint: null
}

export const bidReducer = createReducer(
  initialState,
  on(requestBid, (state) => ({
    ...state,
    requestBidStatus: StoreStatus.LOADING
  })),
  on(requestBidSuccess, (state) => ({
    ...state,
    requestBidStatus: StoreStatus.SUCCESS
  })),
  on(requestBidFailure, (state) => ({
    ...state,
    requestBidStatus: StoreStatus.FAILURE
  })),
  on(approveBid, (state) => ({
    ...state,
    approveBidStatus: StoreStatus.LOADING
  })),
  on(approveBidSuccess, (state) => ({
    ...state,
    approveBidStatus: StoreStatus.SUCCESS
  })),
  on(approveBidFailure, (state) => ({
    ...state,
    approveBidStatus: StoreStatus.FAILURE
  })),
  on(denyBid, (state) => ({
    ...state,
    denyBidStatus: StoreStatus.LOADING
  })),
  on(denyBidSuccess, (state) => ({
    ...state,
    denyBidStatus: StoreStatus.SUCCESS
  })),
  on(denyBidFailure, (state) => ({
    ...state,
    denyBidStatus: StoreStatus.FAILURE
  })),
  on(createBid, (state) => ({
    ...state,
    createBidStatus: StoreStatus.LOADING
  })),
  on(createBidSuccess, (state) => ({
    ...state,
    createBidStatus: StoreStatus.SUCCESS
  })),
  on(createBidFailure, (state) => ({
    ...state,
    createBidStatus: StoreStatus.FAILURE
  })),
  on(getBidHint, (state) => ({
    ...state,
    getBidHintStatus: StoreStatus.LOADING
  })),
  on(getBidHintSuccess, (state, action) => ({
    ...state,
    bidHint: action.price,
    getBidHintStatus: StoreStatus.SUCCESS
  })),
  on(getBidHintFailure, (state) => ({
    ...state,
    getBidHintStatus: StoreStatus.FAILURE
  }))
)
