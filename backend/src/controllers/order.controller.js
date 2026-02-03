import Order from "../models/orders.model.js"
import Product from '../models/product.model.js'
import Cartitem from '../models/cartItem.model.js'
import DeliveryOptions from '../models/deliveryOptions.model.js'
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
};

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

const createOrder = async (req, res) => {
  const cart = req.body;

  if(!Array.isArray(cart) || cart.length === 0){
    return res.status(400).json({ error: 'Invalid Car'})
  }

  let totalCostCents = 0;
  const products = await Promise.all(cart.map( async (item) =>{
    const product = await Product.findByPk(item.productId);
    if(!product){
      return res.status(400).json(`Product not found: ${item.productId}`)
    }
    const deliveryOption = await DeliveryOptions.findByPk(item.deliveryOptionId);
    if(!deliveryOption){
      return res.status(400).json(`DeliveryOption not found: ${item.deliveryOptionId}`)
    }

    const productCost = product.priceCents * item.quantity;
    const shippingCost = deliveryOption.priceCents;
    totalCostCents += productCost + shippingCost;

    const estimatedDeliveryTimeMs = Date.now() + deliveryOption.deliveryDays * 24 * 60 * 60 * 1000;

    return {
      productId : item.productId,
      quantity : item.quantity,
      estimatedDeliveryTimeMs
    }
  }));

  //Tax
  totalCostCents = Math.round(totalCostCents*1.1);

  //Create the order
  const order = await Order.create({
    orderTimeMs : Date.now(),
    totalCostCents,
    products
  });

  await Cartitem.destroy({ where: {}});

  res.status(201).json(order)
};

export{
  loadDefaultOrder,
  getOrders,
  createOrder
}