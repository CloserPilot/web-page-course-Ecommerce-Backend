import Order from "../models/orders.model.js"
import Product from '../models/product.model.js'
import { defaultOrders } from "../defaultData/defaultorders.js"

const loadDefaultOrder = async() => {
  try {
    const orderCount = await Order.count();

    if(orderCount===0){
      await Order.bulkCreate(defaultOrders);
      console.log("Order por defecto cargados")
    }
    else{
      console.log("Order ya existen en la BD")
    }
  } catch (error) {
    console.error("Error in defaultOrder:", error);
  }
}

const getOrders = async (req, res) => {
  try {
    const expand = req.query.expand;
    let orders = await Order.findAll();

    if(expand === 'product'){
      orders = await Promise.all(orders.map( async (order) => {
          const products = await Promise.all(order.products.map(async (product) => {
            let productDetailt = await Product.findByPk(product.productId);
            productDetailt = productDetailt.toJSON();
            productDetailt.image = `${req.protocol}://${req.get('host')}/${productDetailt.image}`;

            return {
              ...product,
              product: productDetailt
            }
          }))
        return{
          ...order.toJSON(),
          products
        }
      }))
    }
    res.status(200).json(orders);
    
  } catch (error) {
    res.status(500).json({
      message: 'Internaln server error', error: error.message
    });
    console.log(error)
  }
};

export{
  loadDefaultOrder,
  getOrders
}