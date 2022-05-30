import offersReducer from '../../redux/reducer';
import {  FetchOfferListActionTypes } from './../../redux/actionTypes';

const initialState = {
  offers: [],
  isLoading: false,
  error: ""
};

// fetch offersReducer
describe('test cases for Offers reducer', () => {

  it('Should return fetchOffers in INIT state', () => {
    const reducerInProgressResponse = offersReducer(initialState, {
      type: FetchOfferListActionTypes.FETCH_OFFER_LIST_INIT,
    });
    expect(reducerInProgressResponse.isLoading).toEqual(true);
  });

  it('Should return fetchOffers success state', () => {
    
    const testPayload =[
      {
        id: "SDMR",
        image: "//fileadmin/files/global/user_upload/fleet/png/350x200/audi-a3-limousine-4d-blau-2020.png",
        name: "Audi",
        currency: "EUR",
        price: 200
      },
      {
        id: "SDMR1",
        image: "//fileadmin/files/global/user_upload/fleet/png/350x200/audi-a3-limousine-4d-blau-2020.png",
        name: "Audi 1",
        currency: "EUR",
        price: 200
      }
    ];
    const reducerSuccessResponse = offersReducer(initialState, {
      type: FetchOfferListActionTypes.FETCH_OFFER_LIST_SUCCESS,
      payload:{offers:testPayload}
    });
    expect(reducerSuccessResponse.isLoading).toEqual(false);
    expect(reducerSuccessResponse.offers.offers).toEqual(testPayload);
  });

  it('Should return fetchOffer error state', () => {
    const reducerFailureResponse = offersReducer(initialState, {
      type: FetchOfferListActionTypes.FETCH_OFFER_LIST_FAILURE,
      error:  'An error occurred',
    });
    expect(reducerFailureResponse.isLoading).toEqual(false);
    expect(reducerFailureResponse.error).toEqual('An error occurred');

  });
  
  it('should return the default state', () => {
    const state = offersReducer(undefined, {type: FetchOfferListActionTypes.DEFAULT});
    expect(state).toEqual(initialState);
  });

});