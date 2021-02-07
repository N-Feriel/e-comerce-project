import { combineReducers } from "redux";

import product from "./products-reducer";
import company from "./companies-reducer";
import cart from './cart-reducer';

export default combineReducers({ product, company, cart });