import DeliveryOptions from "../models/deliveryOptions.model.js"
import { defaultDeliveryOptions } from "../defaultData/deliveryOptions.js"

const loadDefaulDeliveryOptions = async() => {
  try {
    const deliveryCount = await DeliveryOptions.count();

    if(deliveryCount===0){
      await DeliveryOptions.bulkCreate(defaultDeliveryOptions);
      console.log("Delivery por defecto cargados")
    }
    else{
      console.log("Delivery ya existen en la BD")
    }
  } catch (error) {
    console.error("Error in defaultDeliveryOptions:", error);
  }
}

const getDefaulDeliveryOptions = async (req, res) => {
  try {
    const delivers = await DeliveryOptions.findAll();
    res.status(200).json(delivers);
    
  } catch (error) {
    res.status(500).json({
      message: 'Internaln server error', error
    });
  }
};

export{
  loadDefaulDeliveryOptions,
  getDefaulDeliveryOptions
}