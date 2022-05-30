export interface IOfferPrice {
  price?: {
    value?: number,
    currency?: string
  }
}

export interface IOffers {
  id?: string;
  name?: string;
  image?: string;
  price?: number,
  currency?: string,
}
export interface IOffersList extends IOffers {
  offers: any
}
export interface IOffersState extends IOffersList{
  error?: string;
  isLoading?: boolean;
}