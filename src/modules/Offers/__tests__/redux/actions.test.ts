import fetchMock from "jest-fetch-mock";
import { FetchOfferListActionTypes } from '../../redux/actionTypes';
import {
  fetchOfferListInit,
  fetchOfferListSuccess,
  fetchOfferListFailure,
  fetchOffers
} from '../../redux/actions';
import { FetchOffferListActions } from '../../redux/actionTypes';
// get Offer list
const fetchOfferListInitPayload: FetchOffferListActions = {
  type: FetchOfferListActionTypes.FETCH_OFFER_LIST_INIT
};
const fetchOfferListSuccessPayload: FetchOffferListActions = {
  type: FetchOfferListActionTypes.FETCH_OFFER_LIST_SUCCESS,
  payload: {
    offers: [{
      currency: "EUR",
      id: "SDMR",
      image: "//fileadmin/files/global/user_upload/fleet/png/350x200/audi-a3-limousine-4d-blau-2020.png",
      name: "Audi",
      price: 200
    }]
  },
};
const fetchOfferListFailurePayload: FetchOffferListActions = {
  type: FetchOfferListActionTypes.FETCH_OFFER_LIST_FAILURE,
  error: 'An error occurred',
};

describe('test cases for fetchOfferList actions', () => {
  it('test case for fetchOfferList in progress', () => {
    const fetchOfferListInitResponse = fetchOfferListInit();
    expect(fetchOfferListInitResponse.type).toEqual(
      fetchOfferListInitPayload.type,
    );
  });


  it('test case for fetchOfferList success', () => {
    const fetchOfferSuccessResponse = fetchOfferListSuccess(fetchOfferListSuccessPayload.payload);
    expect(fetchOfferSuccessResponse.type).toEqual(
      fetchOfferListSuccessPayload.type,
    );
    expect(fetchOfferSuccessResponse.payload).toEqual(
      fetchOfferListSuccessPayload.payload,
    );
  });

  it('test case for fetchOfferList fail', () => {
    const fetchOfferListFailureResponse = fetchOfferListFailure(
      fetchOfferListFailurePayload.error,
    );
    expect(fetchOfferListFailureResponse.type).toEqual(
      fetchOfferListFailurePayload.type,
    );
    expect(fetchOfferListFailureResponse).toEqual(
      fetchOfferListFailurePayload,
    );
  });


});

beforeEach(() => {
  fetchMock.enableMocks();
  fetchMock.resetMocks();
});

let mockOfferListData = [
  {
    id: "SDMR",
    carGroupInfo: {
      bodyStyleKey: "Limousine",
      modelExample: {
        name: "Audi",
        imageUrl: "https://sixt-vehicle-group-info-images-prod.s3-eu-west-1.amazonaws.com/eb3c65f783b980c0929b5f4a20ad4f2640723126.jpeg"
      },
      prices: {
        totalPrice: {
          amount: {
            value: 200,
            display: "200",
            currency: "EUR"
          },
        }
      }
    }
  },
  {
    id: "SDMR1",
    carGroupInfo: {
      bodyStyleKey: "Limousine",
      modelExample: {
        name: "Audi 1",
        imageUrl: "https://sixt-vehicle-group-info-images-prod.s3-eu-west-1.amazonaws.com/eb3c65f783b980c0929b5f4a20ad4f2640723126.jpeg"
      },
      prices: {
        totalPrice: {
          amount: {
            value: 200,
            display: "200",
            currency: "EUR"
          },
        }
      }
    }
  }
];
let expectedNormalizedData = [
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

describe('fetchOfferList actions', () => {
  it('FETCH_OFFER_SUCCESS when fetchOfferList successfully fetched', async () => {

    fetchMock.mockResponseOnce(JSON.stringify(mockOfferListData), { status: 200 });
    let expectedNormized =  {offers: expectedNormalizedData};
    const expectedActions = [
      { type: FetchOfferListActionTypes.FETCH_OFFER_LIST_INIT },
      { type: FetchOfferListActionTypes.FETCH_OFFER_LIST_SUCCESS, payload: expectedNormized },
    ];

    let func = fetchOffers();
    const dispatch = jest.fn();
    await func(dispatch);
    expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
    // expect(dispatch).toHaveBeenCalledWith(expectedActions[1]);
  });
  it('Show error if data is empty', async () => {

    const expectedActions = [
      { type: FetchOfferListActionTypes.FETCH_OFFER_LIST_INIT },
    ];
    fetchMock.mockResponseOnce(JSON.stringify([]), { status: 200 });
    let func = fetchOffers();
    const dispatch = jest.fn();
    await func(dispatch);
    expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
  })
  it('Show error status >= 200 && status < 300', async () => {

    const expectedActions = [
      { type: FetchOfferListActionTypes.FETCH_OFFER_LIST_INIT },
    ];
    fetchMock.mockResponseOnce(JSON.stringify([]), { status: 400 });
    let func = fetchOffers();
    const dispatch = jest.fn();
    await func(dispatch);
    expect(dispatch).toHaveBeenCalledWith(expectedActions[0]);
  })

});
