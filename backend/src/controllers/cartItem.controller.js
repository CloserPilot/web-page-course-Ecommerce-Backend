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

export{
  loadDefaulCart,
  getDefaultCarts
}