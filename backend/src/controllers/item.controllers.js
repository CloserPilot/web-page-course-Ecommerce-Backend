import Item from "../models/item.model.js"

const registerItem = async(req, res) => {
  try {
    console.log("Request body", req.body);
    const { name, email } = req.body;

    if(!name || !email){
      console.log("Validation failed");
      return res.status(400).json({ error: 'All fields are required'});
    }

    const item =  await Item.create({
      name, 
      email : email.toLowerCase()
    });
    console.log("Item created:", item);

    res.status(201).json({
      message: "Item register sucessfully",
      item: {id: item.id, name: item.name, email: item.email}
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getItems = async(req, res) => {
  try {
    const item = await Item.findAll();
    res.status(200).json(item);
  } catch (error) {
      res.status(500).json({
      message: 'Internaln server error', error
    });
  }
}

export {
  registerItem,
  getItems
}