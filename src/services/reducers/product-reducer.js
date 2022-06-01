import { type as actionTypes } from "../constants/product-constant";

const initialState = {
  products: []
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: findAndReplace(action.payload, state.products),
      };
    default:
      return state;
  }
};

const findAndReplace = (newProduct, products) => {
  const index = products.findIndex(p =>
    p.productId === newProduct.productId &&
    p.color === newProduct.color &&
    p.color === newProduct.color)

  if (index === -1) {
    products.push(newProduct);
  } else {
    products[index] = newProduct;
  }

  return products;
}