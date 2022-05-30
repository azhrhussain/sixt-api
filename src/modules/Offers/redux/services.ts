import { FETCH_OFFERS } from "../constants";

export const fetchOfferListApi = (): Promise<any> => {
      return fetch(`${FETCH_OFFERS}`);
};