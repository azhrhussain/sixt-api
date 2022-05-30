import { AnyAction, Dispatch } from 'redux';
import { normalizeError, normalizeOfferDataResponse } from '../../../utils/helper';
import { IOffersList } from '../types';
import {
  FetchOfferListInitAction, FetchOfferListSuccessAction, FetchOfferListFailureAction,
  FetchOfferListActionTypes
} from './actionTypes';
import { fetchOfferListApi } from './services';

// get Offers
export const fetchOfferListInit = (): FetchOfferListInitAction => ({
  type: FetchOfferListActionTypes.FETCH_OFFER_LIST_INIT,
});
export const fetchOfferListSuccess = (payload: IOffersList): FetchOfferListSuccessAction => ({
  type: FetchOfferListActionTypes.FETCH_OFFER_LIST_SUCCESS,
  payload: payload,
});
export const fetchOfferListFailure = (error: string): FetchOfferListFailureAction => ({
  type: FetchOfferListActionTypes.FETCH_OFFER_LIST_FAILURE,
  error: error,
});

export const fetchOffers = () => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  dispatch(fetchOfferListInit());
  try {
    const response = await fetchOfferListApi();
    const { status } = response;
    const data = await response.json();
    if (status >= 200 && status < 300) {
      dispatch(fetchOfferListSuccess(normalizeOfferDataResponse(data)));
    } else {
      throw new Error(normalizeError(data, status));
    }
  } catch (error: any) {
    dispatch(fetchOfferListFailure(error.message));
  }
};