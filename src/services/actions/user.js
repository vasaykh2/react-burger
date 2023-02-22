import { api } from '../../utils/api';
//import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const PATCH_USER_REQUEST: 'PATCH_USER_REQUEST' = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS' = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED: 'PATCH_USER_FAILED' = 'PATCH_USER_FAILED';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' =
  'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' =
  'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' =
  'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' =
  'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' =
  'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' =
  'RESET_PASSWORD_FAILED';

export const CHECK_AUTH: 'CHECK_AUTH' = 'CHECK_AUTH';

export const SHOW_INFO_BOARD: 'SHOW_INFO_BOARD' = 'SHOW_INFO_BOARD';
export const HIDE_INFO_BOARD: 'HIDE_INFO_BOARD' = 'HIDE_INFO_BOARD';

/*
export const register= ({
  email,
  password,
  name,
}) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    api
      .register(email, password, name)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.user,
          });
          localStorage.setItem("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken);
        }
      })
      .catch((err) =>
        dispatch({
          type: REGISTER_FAILED,
          payload: err.message,
        })
      );
  };
};

export const getUserInfo = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    api
      .getUserInfo(getCookie("accessToken"))
      .then((res) => {
        res &&
          res.success &&
          dispatch({
            type: GET_USER_SUCCESS,
            payload: res.user,
          });
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          dispatch(refreshToken());
        }
        dispatch({
          type: GET_USER_FAILED,
        });
      })
      .finally(() =>
        dispatch({
          type: CHECK_AUTH,
        })
      );
  };
};

export const patchUserInfo= ({
  email,
  password,
  name,
}) => {
  return function (dispatch) {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
    api
      .patchUserInfo(email, password, name, getCookie("accessToken"))
      .then((res) => {
        res &&
          res.success &&
          dispatch({
            type: PATCH_USER_SUCCESS,
            payload: { userInfo: res.user, message: "User info changed" },
          });
      })
      .catch((err) => {
        dispatch({
          type: PATCH_USER_FAILED,
          payload: err.message,
        });
      });
  };
};

export const refreshToken = () => {
  return function (dispatch) {
    api
      .refreshToken(localStorage.getItem("refreshToken"))
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken);
          dispatch(getUserInfo());
        }
      })
      .catch((err) =>
        dispatch({
          type: GET_USER_FAILED,
        })
      );
  };
};


export const logIn = ({ email, password }) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    api
      .logIn(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.user,
          });
          localStorage.setItem("refreshToken", res.refreshToken);
          setCookie("accessToken", res.accessToken);
        }
      })
      .catch((err) =>
        dispatch({
          type: LOGIN_FAILED,
          payload: err.message,
        })
      );
  };
};

export const logOut = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    api
      .logOut(localStorage.getItem("refreshToken"))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
          localStorage.removeItem("refreshToken");
          deleteCookie("accessToken");
        }
      })
      .catch((err) =>
        dispatch({
          type: LOGOUT_FAILED,
          payload: err.message,
        })
      );
  };
};
*/

export const requestPasswordReset = ({ email }) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    api
      .requestPasswordReset(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          });
        }
      })
      .catch((err) =>
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
          payload: err.message,
        })
      );
  };
};

export const resetPassword = ({ password, token }) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    api
      .resetPassword(password, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: 'Password changed',
          });
        }
      })
      .catch((err) =>
        dispatch({
          type: RESET_PASSWORD_FAILED,
          payload: err.message,
        })
      );
  };
};

export const showInfoBoard = (message) => ({
  type: SHOW_INFO_BOARD,
  payload: message,
});

export const hideInfoBoard = () => ({
  type: HIDE_INFO_BOARD,
});
