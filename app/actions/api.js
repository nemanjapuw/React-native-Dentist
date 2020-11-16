import * as Utils from "@utils";
import { store } from "../store"
const _TOKEN = () => {
  try {
    return store.getState().auth.login.data.token;
  } catch (error) {
    return null
  };
}

export const getServices = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getservices`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, services: res.services });
    })
    .catch(err => callback({ success: false, servies: err }));
}

export const getToothList = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/gettoothlist`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, tooth_list: res.tooth_list });
    })
    .catch(err => callback({ success: false, tooth: err }));
}

export const getShippingOptions = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getshippingoptions`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, shipping_options: res.shipping_options });
    })
    .catch(err => callback({ success: false, shipping_options: err }));
}

export const getMaterialContact = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getmaterialcontact`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, materials: res.list });
    })
    .catch(err => callback({ success: false, materials: err }));
}

export const getMaterialOverlay = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getmaterialoverlay`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, materials: res.list });
    })
    .catch(err => callback({ success: false, materials: err }));
}

export const getMaterialSingle = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getmaterialsingle`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, materials: res.list });
    })
    .catch(err => callback({ success: false, materials: err }));
}

export const getMaterialPartial = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getmaterialpartial`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, materials: res.list });
    })
    .catch(err => callback({ success: false, materials: err }));
}


export const getMaterialImplant = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getmaterialimplant`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, materials: res.list });
    })
    .catch(err => callback({ success: false, materials: err }));
}


export const getColors = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getcolors`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, colors: res.list });
    })
    .catch(err => callback({ success: false, colors: err }));
}

export const getCrownOptions = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getcrownoption`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, crownoptions: res.list });
    })
    .catch(err => callback({ success: false, crownoptions: err }));
}

export const getCrownTypes = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getcrowntype`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, crowntypes: res.list });
    })
    .catch(err => callback({ success: false, crowntypes: err }));
}

export const getPriceTables = callback => dispatch => {
   fetch(`${Utils.SERVER_HOST}/api/getpricetables`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {      
      callback({ success: res.success, pricetables: res.list });
    })
    .catch(err => callback({ success: false, pricetables: err }));
}

export const create_service = (news) => async(dispatch) => {
  try {
    const response = await fetch(`${Utils.SERVER_HOST}/api/addservice`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${_TOKEN()}`
      },
      body: JSON.stringify(news)
    });
    const responseJson = await response.json();   
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export const addPatient = (patient, callback) => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/addpatient`, {
   method: 'POST',
   headers: {
     'content-type': 'application/json',
     'Authorization': `Bearer ${_TOKEN()}`
   },
   body: JSON.stringify(patient)
 })
   .then(res => res.json())
   .then(res => {    
     callback({ success: res.success});
   })
   .catch(err => callback({ success: false}));
}

export const getPatients = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getpatients`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {    
      callback({ success: res.success, list: res.list });
    })
    .catch(err => {callback({ success: false, list: err })});
}


export const getServiceList = (cond, callback) => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getservicelist`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
    body: JSON.stringify(cond)
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, list: res.list });
    })
    .catch(err => callback({ success: false, list: err }));
}

export const getServiceItem = (data, callback) => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getserviceitem`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, item: res.item });
    })
    .catch(err => callback({ success: false, item: err }));
}

export const getDash = callback => dispatch => {
  fetch(`${Utils.SERVER_HOST}/api/getdash`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
  })
    .then(res => res.json())
    .then(res => {    
      callback({ success: res.success, item: res.item });
    })
    .catch(err => {callback({ success: false, item: err })});
}

export const getUser = (cond, callback) => dispatch => { 
  fetch(`${Utils.SERVER_HOST}/api/getuser`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
    body: JSON.stringify(cond)
  })
    .then(res => res.json())
    .then(res => {
      callback({ success: res.success, user: res.user });
    })
    .catch(err => {callback({ success: false, list: err })});
}

export const updateUser = (userinfo, callback) => dispatch => { 
  fetch(`${Utils.SERVER_HOST}/api/updateuser`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${_TOKEN()}`
    },
    body: JSON.stringify(userinfo)
  })
    .then(res => res.json())
    .then(res => {
      console.log(JSON.stringify(res));
      if (res.err)
        callback({ success: false, code: res.code });
      else {
        if(res.code == '200')
          callback({ success: true, code: res.code });
        else 
          callback({ success: false, code: res.code });
      }
    })
    .catch(err => callback({ success: false, code: err }));
};












