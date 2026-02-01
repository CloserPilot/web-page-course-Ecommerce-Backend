import Product from "../models/product.model.js"
import { defaultProducts } from "../defaultData/defaultProducts.js"

const loadDefaultProducts = async() => {
  try {
    const productCount = await Product.count();

    if(productCount===0){
      await Product.bulkCreate(defaultProducts);
      console.log("Productos por defecto cargados")
    }
    else{
      console.log("Productos ya existen en la BD")
    }
  } catch (error) {
    console.error("Error in defaultProducts:", error);
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'ASC']] });

    const productWithImages = products.map(p=> {
      const productJson = p.toJSON();
      productJson.image = `${req.protocol}://${req.get('host')}/${productJson.image}`;
      return productJson;
    });

    res.status(200).json(productWithImages);
    
  } catch (error) {
    res.status(500).json({
      message: 'Internaln server error', error
    });
  }
};

export {
  loadDefaultProducts,
  getProducts
}