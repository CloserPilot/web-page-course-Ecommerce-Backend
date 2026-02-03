import sequelize from '../config/database.js';
import {
  defaultCart,
  defaultOrders,
  defaultProducts,
  defaultDeliveryOptions} from '../defaultData/index.js';

import { CartItem, Order, Product, DeliveryOption} from '../models/index.js';


const deleteAll = async(req, res) => {
  try {
    await sequelize.sync({ force: true })

    //Load default data
    await CartItem.bulkCreate(defaultCart);
    console.log("Cart por defecto cargados")

    await Order.bulkCreate(defaultOrders);
    console.log("Order por defecto cargados")

    await Product.bulkCreate(defaultProducts);
    console.log("Product por defecto cargados");

    await DeliveryOption.bulkCreate(defaultDeliveryOptions);
    console.log("DeliveryOptions por defecto cargados");

    res.status(204).send();
  } catch (error) {
    console.error("Error in defaultDeliveryOptions:", error);
  }
};

export{
  deleteAll
}