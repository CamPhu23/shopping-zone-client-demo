import { call, put, takeEvery } from 'redux-saga/effects';
import { type as actionTypes } from '../../constants/product-constant';
import { addToCartRequest } from '../../actions/product-action';
import { authService } from '../../modules'

function* addToCartWorker(action) {
  yield put(addToCartRequest(action.payload));
}

function* productSaga() {
  yield takeEvery(actionTypes.ADD_PRODUCT_REQUEST, addToCartWorker);
}

export default productSaga;