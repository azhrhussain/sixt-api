
import {IOffersState} from '../modules/Offers/types';
export interface IRootState  {
  offers: IOffersState,
}

export interface ActionType {
	type: any,
  payload?: any,
}

export interface IErrorCard{
  errorText?: string;
  size?: string;
}

export interface ILoader{
  loaderText?: string;
}