import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { loginFail, loginSuccess, refreshTokenSuccess } from '../../actions/auth-action';
import { type as actionTypes } from '../../constants/auth-constant';
import { authService, systemService } from '../../modules'

// worker Saga: will be fired on AUTH_LOGIN_REQUEST actions
function* loginWorker(action) {
  try {
    const response = yield call(authService.handleLogin, action.payload);
    const { accessToken, refreshToken, user } = response;
    yield put(loginSuccess({ accessToken, user }));
    systemService.saveRefreshToken(refreshToken);
  } catch (e) {
    const { status } = JSON.parse(e.message);
    const message = status == 404
      ? "Tên tài khoản hoặc mật khẩu bị sai"
      : "Lỗi đăng nhập, vui lòng thử lại";

    yield put(loginFail({ status, message }))
    console.log(e.message); //something like that: {"status":404,"statusText":"Not Found"}
  }
}

function* refreshTokenWorker(action) {
  try {
    const response = yield call(authService.handleRefreshToken, action.payload);
    const { accessToken, refreshToken, user } = response;
    yield put(refreshTokenSuccess({ newAccessToken: accessToken, newUser: user }));
    systemService.saveRefreshToken(refreshToken);
  } catch (error) {
    console.log(error.message);
  }
}

function* authSaga() {
  yield takeEvery(actionTypes.AUTH_LOGIN_REQUEST, loginWorker);
  yield takeLatest(actionTypes.AUTH_REFRESH_TOKEN_REQUEST, refreshTokenWorker);
}

export default authSaga;