import axios from 'axios';

const URL='http://localhost:5000'

// Signup
export const authenticateSignup=async(data) =>{
    //call backend API to authenticate signup
    try{
        // Data post
        return await axios.post(`${URL}/signup`,data);
    }catch(e){
        console.log('Error while calling signup api',e.message);
    }
}

// Login
export const authenticateLogin=async(data) =>{
    //call backend API to authenticate signup
    try{
        // Data post
        const response = await axios.post(`${URL}/login`,data);
        return response;

    }catch(e){
        console.log('Error while calling login api',e.message);
        return e.response;
    }
}