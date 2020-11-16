// - LOGIN
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN = "LOGIN";
export const LOGIN_START = "LOGIN_START";
export const SERVICE_TODO = "SERVICE_TODO";
export const OPTION = "OPTION";
export const ORIGIN = "ORIGIN";



export const onService = data => {
    return {            
        type: SERVICE_TODO,
        data
    };
};

export const onOption = data => {
    return {            
        type: OPTION,
        data
    };
};

export const onOrigin = data => {
    return {            
        type: ORIGIN,
        data
    };
};

