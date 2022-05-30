import { IOffersList } from './../modules/Offers/types';
import { ERROR_UNAVAILABLE, ERROR_WITH_STATUS } from './constants';

//Error with helper text for unhandled errors
export const normalizeError = (data: any, status: number): string =>{
  if (data.message) {
    return data.message;
  }
  else if(status === 200 && !data.message ){
    return ERROR_UNAVAILABLE;
  }
  else if(status) {
    return ERROR_WITH_STATUS.replace(':status',status.toString());
  }
  return ERROR_UNAVAILABLE;
};

// normalizeOffersDataResponse with Offers Interface
export const normalizeOfferDataResponse = (data: any): IOffersList => {
  const { offers } = data;
  const offersList = offers.map((offer: any) => {
    const {
      id,
      carGroupInfo: { modelExample },
      prices: { totalPrice: { amount } } 
    } = offer;

    return {
      id: id,
      name: modelExample.name,
      image: modelExample.imageUrl,
      price: amount.value,
      currency: amount.currency
    };
  });
  return offersList;
};
