import productModel from "../model/productModel.js";  // Make sure this matches


export const getProducts=async(request,response)=>{
    try{
        const products= await productModel.find({}); //empty object{}
        response.status(200).json(products);
    }catch(e){
        console.log("Error in getProducts",e.message);
    }
} ;

export const getProductById=async(request,response)=>{
    try{
        const id =request.params.id;
        const product= await productModel.findOne({"id":id});
        response.status(200).json(product);
    }catch(e){
        console.log("Error in getProductById",e.message);
    }
}; 