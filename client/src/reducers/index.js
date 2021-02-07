import { combineReducers } from "redux";

import product from "./products-reducer";
import company from "./companies-reducer";

export default combineReducers({ product, company });