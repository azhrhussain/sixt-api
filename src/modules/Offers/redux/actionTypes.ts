import { IOffersList } from "../types";

export enum FetchOfferListActionTypes {
 FETCH_OFFER_LIST_INIT = 'FETCH_OFFER_LIST_INIT',
 FETCH_OFFER_LIST_SUCCESS = 'FETCH_OFFER_LIST_SUCCESS',
 FETCH_OFFER_LIST_FAILURE = 'FETCH_OFFER_LIST_FAILURE',
 DEFAULT = 'DEFAULT',
}


export type FetchOfferListInitAction ={
  type: FetchOfferListActionTypes.FETCH_OFFER_LIST_INIT,
}

export type FetchOfferListSuccessAction ={
  type: FetchOfferListActionTypes.FETCH_OFFER_LIST_SUCCESS,
  payload: IOffersList,
}
export type FetchOfferListFailureAction ={
  type: FetchOfferListActionTypes.FETCH_OFFER_LIST_FAILURE,
  error: string,
}
export type FetchOfferListDefault ={
  type:FetchOfferListActionTypes.DEFAULT,
}

export type FetchOfferActionsTypes = 
FetchOfferListInitAction |
FetchOfferListSuccessAction | 
FetchOfferListFailureAction |
FetchOfferListDefault;

export type FetchOffferListActions =  FetchOfferActionsTypes;