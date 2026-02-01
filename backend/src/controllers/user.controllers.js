import User from "../models/user.model.js"

const registerUser = async(req, res) => {
  try {
    console.log("Request body", req.body);
    const { name, email } = req.body;

    if(!name || !email){
      console.log("Validation failed");
      return res.status(400).json({ error: 'All fields are required'});
    }

    const user =  await User.create({
      name, 
      email : email.toLowerCase()
    });
    console.log("User created:", user);

    res.status(201).json({
      message: "User register sucessfully",
      user: {id: user.id, name: user.name, email: user.email}
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {
  registerUser
}