
import * as actionType from '../constants/cartConstant';
export const cartReducer = (state = { CartItems: [] } , action) => {

    switch (action.type) {
        case actionType.ADD_TO_CART:
            const item = action.payload; // get the item from payload
            const existItem = state.CartItems.find(product => product.id === item.id); // state  - already available in redux 
            if (existItem) {
                return{
                    ...state,
                    CartItems:state.CartItems.map(data=>data.product === existItem.product ? item : data) // if exist item is there then update the quantity of that item
                }
            }else{
                return {
                    ...state,
                    CartItems: [...state.CartItems, item] // if not exist then add the item to cart
                }
            }
        case actionType.REMOVE_FROM_CART:
            return {
                ...state,
                CartItems: state.CartItems.filter(product => product.id !== action.payload) // remove the item from cart
            }
        default:
            return state; // return the state as it is
    }
}