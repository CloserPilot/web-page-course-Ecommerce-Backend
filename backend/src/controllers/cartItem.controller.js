import CartItem from "../models/cartItem.model.js"
import Product from "../models/product.model.js"
import { defaultCart } from "../defaultData/defaultCart.js"

const loadDefaulCart = async() => {
  try {
    const cartCount = await CartItem.count();

    if(cartCount===0){
      await CartItem.bulkCreate(defaultCart);
      console.log("Cart por defecto cargados")
    }
    else{
      console.log("Cart ya existen en la BD")
    }
  } catch (error) {
    console.error("Error in defaultCart:", error);
  }
}

const getDefaultCarts = async (req, res) => {
  try {
    const expand = req.query.expand;
    let carts = await CartItem.findAll();

    if(expand === 'product'){
      carts = await Promise.all(carts.map( async (item) => {
        let product = await Product.findByPk(item.productId);

        //Codigo para insertar la ruta absoluta
        product = product.toJSON();
        product.image = `${req.protocol}://${req.get('host')}/${product.image}`;

        return{
          ...item.toJSON(),
          product
        }
      }
      ))
    }

    res.status(200).json(carts);
    
  } catch (error) {
    res.status(500).json({
      message: 'Internaln server error', error
    });
  }
};

const registerCart = async (req, res) => {
   try {
    const { productID, quantity } = req.body;

    //Check if product exits in the database
    const product = await Product.findByPk(productID);
    if(!product){
      return res.status(400).json({ error: 'Product not found' });
    }

    //Check if quantity is a number between 1 and 10
    if (typeof quantity !== 'number' || quantity < 1 || quantity > 10){
      return res.status(400).json({ error: 'Quantity must be a number between 1 and 10' });
    }

    //Check if product already exist in the cart
    const cartItem = await CartItem.findOne({ where: { productID }})
    if(cartItem){
      cartItem.quantity += quantity;
      await cartItem.save();
      res.status(201).json({ 
      message: 'Cart registered successfully',
      cart : {productId: cartItem.productId, quantity: cartItem.quantity, deliveryOptionId : cartItem.deliveryOptionId} 
    });  
    } else{
      await CartItem.create({
        productId: productID, quantity, deliveryOptionId:"1"
      })
      res.status(201).json({ 
      message: 'Cart registered successfully',
      cart : {productId: productID, quantity: quantity, deliveryOptionId : "1"} 
      });  

    }
    
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export{
  loadDefaulCart,
  getDefaultCarts,
  registerCart
}