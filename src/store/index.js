import { createStore, combineReducers } from "redux";
import spinnerReducer from "./reducer/spinnerReducer";

const reducer = combineReducers({ spinnerValue: spinnerReducer });
const initialState = { spinnerValue: { name: "true" } };

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
