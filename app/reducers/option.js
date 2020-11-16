import * as actionTypes from "@actions/actionTypes";
const initialState = {
    option: {
        service_type : {},     
      }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.OPTION:
      return {
        service_type : action.data
      };
    default:
      return state;
  }
};
