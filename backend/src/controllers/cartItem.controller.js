import CartItem from "../models/cartItem.model.js"
import Product from "../models/product.model.js"

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
    if (typeof quantity !== 'number' || quantity < 1){
      return res.status(400).json({ error: 'Quantity must be a number greater than 0' });
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

const updateCart = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const [updatedRows] = await CartItem.update(req.body, {
      where: { productId: req.params.productID },
      returning: true
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const updatedCart = await CartItem.findOne({
      where: { productId: req.params.productID }
    });

    res.status(200).json({
      message: "Cart updated successfully",
      cart: updatedCart
    });
  } catch (error) {
    console.error("Error in updateCart:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const deletedRows = await CartItem.destroy({
      where: { productId: req.params.productID }
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export{
  getDefaultCarts,
  registerCart,
  updateCart,
  deleteCart
}