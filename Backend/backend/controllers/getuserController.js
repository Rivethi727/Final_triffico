import User from '../models/userModel.js'


export const getUserByEmail = async (req, res) => {
    try {
      const specificUser = await User.findOne({email: req.params.email});
      if (!specificUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(specificUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export  default getUserByEmail;