import { type as actionTypes } from "../constants/auth-constant";

const initialState = {
  accessToken: null,
  expiredTime: null,
  loading: null,
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.AUTH_LOGIN_SUCCESS:
      const { accessToken, user } = action.payload;
      return {
        ...state,
        accessToken: accessToken.token,
        expiredTime: accessToken.expiredTime,
        user,
        loading: false,
      };
    case actionTypes.AUTH_REFRESH_TOKEN_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case actionTypes.AUTH_REFRESH_TOKEN_SUCCESS:
      const { newAccessToken, newUser } = action.payload;

      return {
        ...state,
        accessToken: newAccessToken.token,
        expiredTime: newAccessToken.expiredTime,
        user: newUser,
        loading: false,
      };
    default:
      return state;
  }
};