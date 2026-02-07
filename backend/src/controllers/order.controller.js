import Order from "../models/orders.model.js"
import Product from '../models/product.model.js'
import Cartitem from '../models/cartItem.model.js'
import DeliveryOptions from '../models/deliveryOptions.model.js'

const getOrders = async (req, res) => {
  try {
    const expand = req.query.expand;
    let orders = await Order.findAll({order: [['orderTimeMs', 'DESC']]});

    if(expand === 'product'){
      orders = await Promise.all(orders.map( async (order) => {
          const products = await Promise.all(order.products.map(async (product) => {
            let productDetailt = await Product.findByPk(product.productId);
            productDetailt = productDetailt.toJSON();
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

const getIdOrder = async (req, res) => {
  try {
    const expand = req.query.expand;
    let order = await Order.findByPk(req.params.orderID);

    if(!order) return res.status(404).json({
      message: "Order not found"
    });

    if(expand === 'product'){
      const products = await Promise.all(order.products.map( async (item) => {
        let product = await Product.findByPk(item.productId);
        return{
          ...item,
          product
        }
      }));

      order = {
        ...order.toJSON(),
        products
      }
    };
    res.status(200).json({order});

  } catch (error) {
      res.status(500).json({
      message: `Internal server error' ${error.message}`
    });
  }
};

const createOrder = async (req, res) => {
  const cart = await Cartitem.findAll();

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
  getOrders,
  createOrder,
  getIdOrder
}