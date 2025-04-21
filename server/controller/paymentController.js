import productModel from "../model/productModel.js";  // Make sure this matches
import userModel from "../model/userModel.js";
import { ObjectId } from 'mongodb'; 

// paytime
import paytime from '../dotenv/paytime.js';
import SSLCommerzPayment from 'sslcommerz-lts';


// post order
export const postOrder = async(request,response)=>{ 
    try{
        const product = await productModel.findOne({id:request.body.productID});
        const order = request.body;

        // Generate unique tran_id
        const tran_id = new ObjectId().toString();

        const {store_id,store_passwd} = paytime;

        const is_live = false; //true for live, false for sandbox

        const data = {
            total_amount: product.price.cost,
            currency: order.currency,
            tran_id: tran_id, // use unique tran_id for each api call
            success_url: `http://localhost:5000/payment/success/${tran_id}`,
            fail_url: 'http://localhost:3030/fail',
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: product.title.shortTitle,
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: order.fullName,
            cus_username: user.username,
            cus_email: order.email,
            cus_add1: order.address,
            cus_add2: '',
            cus_city: order.city,
            cus_state:  order.city,
            cus_postcode: '0000',
            cus_country: 'Bangladesh',
            cus_phone:  order.phone,
            cus_fax: '00000000',
            ship_name: order.fullName,
            ship_add1: order.address,
            ship_add2: 'Dhaka',
            ship_city: order.city,
            ship_state: 'Dhaka',
            ship_postcode: '0000',
            ship_country: 'Bangladesh',
        };

        console.log(data);

        const sslcz = new SSLCommerzPayment(
            store_id, 
            store_passwd, 
            is_live
        )
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            response.send({url:GatewayPageURL}); // go to paymentForm fetch url
            
            const finalOrder={
                product, 
                
                paidStatus:false, 
                transactionId:tran_id
            }


           
            console.log('Redirecting to: ', GatewayPageURL)
        });
    }catch(e){
        console.log("Error in postOrder",e.response);
    }
} ;


// post success
export const postSuccess = async(request,response)=>{
    try{
        console.log(request.params.tran_id);
    }catch(e){
        console.log("Error in postSuccess",e.response);
    }
}