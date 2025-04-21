import axios from 'axios';
import * as actionTypes from '../constants/cartConstant';

const URL = 'http://localhost:5000/';
// add to cart
export const addToCart = (id, quantity)=>async(dispatch)=>{
    try{
        const {data} = await axios.get(`${URL}product/${id}`);
        dispatch({type:actionTypes.ADD_TO_CART, payload:{...data, quantity}})
    }catch(error){
        dispatch({type:actionTypes.ADD_TO_CART_FAIL, payload:error.response})
    }
}

// remove from cart
export const removeFromCart = (id)=>(dispatch)=>{ // async not needed here bacause we are not making any api call
    dispatch({type:actionTypes.REMOVE_FROM_CART, payload:id})
}