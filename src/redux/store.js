import { createStore } from "redux";
import flagReducer from "./flag/flagReducer";

const store = createStore(flagReducer);
export default store;
