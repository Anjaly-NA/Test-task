import {
  SET_SPINNER_FALSE,
  SET_SPINNER_TRUE,
  ADD_EVENT_VISIBLE,
  ADD_EVENT_HIDDEN,
  SET_EVENT_VALUE,
  UNSET_EVENT_VALUE,
  SET_BLOG_COUNT,
} from "./flagTypes";

export const setSpinnerFalse = () => {
  return {
    type: SET_SPINNER_FALSE,
  };
};
export const setSpinnerTrue = () => {
  return {
    type: SET_SPINNER_TRUE,
  };
};
export const addEventVisible = () => {
  return {
    type: ADD_EVENT_VISIBLE,
  };
};
export const addEventHidden = () => {
  return {
    type: ADD_EVENT_HIDDEN,
  };
};
export const setEventValue = (value = {}) => {
  return {
    type: SET_EVENT_VALUE,
    payload: value,
  };
};
export const unsetEventValue = () => {
  return {
    type: UNSET_EVENT_VALUE,
  };
};
export const setBlogCount = (value) => {
  return {
    type: SET_BLOG_COUNT,
    payload: value,
  };
};
