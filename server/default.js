import {products} from './dataset/data.js'
import productModel from './model/productModel.js'

const DefaultData = async() => {
 try {
    await productModel.insertMany(products);
    console.log("Default Data Inserted Successfully");
 }catch(e) {
  console.log("Error in DefaultData", e.message)
 }
}

export default DefaultData
