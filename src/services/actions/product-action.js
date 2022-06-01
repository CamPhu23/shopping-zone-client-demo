import {type as actionTypes} from '../constants/product-constant';

export const addToCartRequest = (formData) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    payload: formData
  };
};