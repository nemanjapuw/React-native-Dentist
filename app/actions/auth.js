import * as actionTypes from "./actionTypes";
import * as Utils from "../utils";
import { store } from "../store"
const onLogin = data => {
  return {
    type: actionTypes.LOGIN,
    data
  };
};

export const registration = (userinfo, callback) => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(userinfo)
  })
    .then(res => res.json())
    .then(res => {
      if (res.err)
        callback({ success: false, data: res.data });
      else {
        if(res.status == '200')
          callback({ success: true, data: res.data });
        else 
          callback({ success: false, data: res.data });
      }
    })
    .catch(err => callback({ success: false, data: err }));
};

export const authentication = (login, userinfo, callback) => dispatch => {
  let data = {
    success: login,
    data:{},
  };
  if (!login) {
    let _TOKEN = store.getState().auth.login.data.token;
    dispatch(onLogin(data));
    fetch(`${Utils.SERVER_HOST}/api/logout`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${_TOKEN}`,
      }
    });

    callback({ success: true });
    return;
  }
  fetch(`${Utils.SERVER_HOST}/api/signin`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(userinfo)
  })
    .then(res => res.json())
    .then(res => {         
      if (res.success) {            
        data.data = res.data;
        dispatch(onLogin(data));
      }
      return callback({ success: res.success, data: res.message });
    })
    .catch(err => { callback({ success: false, data: err }) });
};