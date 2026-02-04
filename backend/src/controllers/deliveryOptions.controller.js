import DeliveryOptions from "../models/deliveryOptions.model.js"

const getDefaulDeliveryOptions = async (req, res) => {
  try {
    const delivers = await DeliveryOptions.findAll();
    let response = delivers;
    const expand = req.query.expand;

    if(expand === 'estimatedDeliveryTime'){
      response = await Promise.all(delivers.map( async (deliver) => {
        const deliverMs = Date.now() + deliver.deliveryDays * 24 * 60 * 60 * 1000;

        return{
          ...deliver.toJSON(),
          estimatedDeliveryTime: deliverMs
        }
      }));
    }

    res.status(200).json(response);
    
  } catch (error) {
    res.status(500).json({
      message: 'Internaln server error', error
    });
  }
};



export{
  getDefaulDeliveryOptions
}