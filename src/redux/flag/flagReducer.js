import { SET_SPINNER_FALSE } from "./flagTypes";
import { SET_SPINNER_TRUE } from "./flagTypes";
import { ADD_EVENT_VISIBLE } from "./flagTypes";
import { ADD_EVENT_HIDDEN } from "./flagTypes";
import { SET_EVENT_VALUE } from "./flagTypes";
import { UNSET_EVENT_VALUE } from "./flagTypes";

const initialState = {
  spinnerValue: false,
  addEventBox: false,
  editEventValue: {},
};
const flagReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPINNER_FALSE:
      return { ...state, spinnerValue: false };
    case SET_SPINNER_TRUE:
      return { ...state, spinnerValue: true };
    case ADD_EVENT_VISIBLE:
      return { ...state, addEventBox: true };
    case ADD_EVENT_HIDDEN:
      return { ...state, addEventBox: false };
    case SET_EVENT_VALUE:
      return { ...state, editEventValue: action.payload };
    case UNSET_EVENT_VALUE:
      return { ...state, editEventValue: false };
    default:
      return state;
  }
};
export default flagReducer;
