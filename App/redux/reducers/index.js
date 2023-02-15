import { combineReducers } from "redux";
import addressReducer from "./addressReducer";
import cartReducer from "./cartReducer";
import paymentReducer from "./paymentReducer";
import productReducer from "./productReducer";
import tokenReducer from "./tokenReducer";
import totalReducer from "./total";
import userReducer from "./userReducer";

let reducers = combineReducers({
  cartReducer: cartReducer,
  userReducer: userReducer,
  addressReducer: addressReducer,
  tokenReducer: tokenReducer,
  totalReducer: totalReducer,
  productReducer: productReducer,
  paymentReducer: paymentReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
