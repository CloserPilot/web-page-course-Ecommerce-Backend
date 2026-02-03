import DeliveryOptions from "../models/deliveryOptions.model.js"

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
  getDefaulDeliveryOptions
}