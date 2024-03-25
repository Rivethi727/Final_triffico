import Trip from '../models/tripModel.js';

const getUserById = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const packageDate = await Trip
      .findOne({userId:userId})
      .sort({ createdAt: -1 }) 
      .limit(1);
  
      if (!packageDate) {
        return res.status(404).json({ error: 'packageDate not found' });
      }
  
      res.status(200).json(packageDate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export default getUserById