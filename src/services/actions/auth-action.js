import {type as actionTypes} from '../constants/auth-constant';

export const loginRequest = (formData) => {
  return {
    type: actionTypes.AUTH_LOGIN_REQUEST,
    payload: formData
  };
};

export const loginSuccess = (tokenData) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    payload: tokenData
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
    payload: error
  }
}

export const refreshTokenRequest = (token) => {
  return {
    type: actionTypes.AUTH_REFRESH_TOKEN_REQUEST,
    payload: token
  }
}

export const refreshTokenSuccess = (newToken) => {
  return {
    type: actionTypes.AUTH_REFRESH_TOKEN_SUCCESS,
    payload: newToken
  }
}

export const resetError = () => {
  return {
    type: actionTypes.AUTH_RESET_ERROR
  }
}