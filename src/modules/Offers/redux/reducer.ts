
import produce from "immer";
import {FetchOfferListActionTypes, FetchOffferListActions} from './actionTypes';
import { IOffersState } from '../types';

const initialState: IOffersState = {
  offers: [],
  isLoading: false,
  error: ""
};

const  offersReducer = (state= initialState, action:FetchOffferListActions ): IOffersState => {
  switch (action.type) {
    case FetchOfferListActionTypes.FETCH_OFFER_LIST_INIT: {
      return produce(state, draft => {
        draft.isLoading = true;
      });
    }
    case FetchOfferListActionTypes.FETCH_OFFER_LIST_SUCCESS: {
      return produce<IOffersState>(state, draft => {
        draft.isLoading = false,
        draft.offers = action.payload
      });
    }
    case FetchOfferListActionTypes.FETCH_OFFER_LIST_FAILURE: {
      return produce<IOffersState>(state, draft => {
        draft.isLoading = false,
        draft.error = action.error;
      });
    }
    default:
      return state;
    }
};
export default offersReducer;