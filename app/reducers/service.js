import * as actionTypes from "@actions/actionTypes";
const initialState = {
    service: {
        service_list:{},
        name : '',
        gender : '',
        bio:'',
        pay_mount: '',
      }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SERVICE_TODO:
      return {
        service: action.data
      };
    default:
      return state;
  }
};
