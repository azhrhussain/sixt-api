import { combineReducers } from 'redux';
import offersReducer from "../modules/Offers/redux/reducer";

const rootReducer = combineReducers({
  offers: offersReducer,
});
export default rootReducer;
