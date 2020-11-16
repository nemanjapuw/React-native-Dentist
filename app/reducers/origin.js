import * as actionTypes from "@actions/actionTypes";
const initialState = {
    origin: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.ORIGIN:
      return {
        origin: action.data
      };
    default:
      return state;
  }
};
