import Order from "../models/orders.model.js"
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
    const orders = await Order.findAll();
    res.status(200).json(orders);
    
  } catch (error) {
    res.status(500).json({
      message: 'Internaln server error', error
    });
  }
};

export{
  loadDefaultOrder,
  getOrders
}