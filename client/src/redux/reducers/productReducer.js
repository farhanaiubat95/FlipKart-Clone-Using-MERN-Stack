import * as actionTypes from "../constants/productConstant";

const initialStateProducts = { products: [], error: null }; // products: [] - for multiple objects

export const getProductsReducer = (state = initialStateProducts, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return { products: action.payload, error: null };

    case actionTypes.GET_PRODUCTS_FAIL:
      return { ...state, error: action.payload.message }; // ✅ Use `message` only

    default:
      return state;
  }
};

// get product details by id
const initialStateProduct = { product: {}, error: null }; // products: [] - for multiple objects
export const getProductDetailsReducer = (state=initialStateProduct,action)=>{
switch(action.type){
  case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
    return {loading:true}
  case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
    return {loading:false,product:action.payload} // if product come - then loading:false
  case actionTypes.GET_PRODUCT_DETAILS_FAIL:
    return {loading:false,error:action.payload}
  case actionTypes.GET_PRODUCT_DETAILS_RESET:
    return {product:{}}
  default:
    return state

}
}