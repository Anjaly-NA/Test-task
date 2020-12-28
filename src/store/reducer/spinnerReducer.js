import { SET_SPINNER_FALSE } from "../action/spinnerAction";

const spinnerReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_SPINNER_FALSE:
      return { name: payload };
    default:
      return state;
  }
};
export default spinnerReducer;
