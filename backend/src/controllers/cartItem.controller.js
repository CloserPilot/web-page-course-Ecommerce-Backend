import CartItem from "../models/cartItem.model.js"
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
    const carts = await CartItem.findAll();
    res.status(200).json(carts);
    
  } catch (error) {
    res.status(500).json({
      message: 'Internaln server error', error
    });
  }
};

export{
  loadDefaulCart,
  getDefaultCarts
}