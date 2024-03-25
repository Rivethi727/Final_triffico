import express from 'express';
const router = express.Router();
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    createUser
    
  } 
from '../controllers/userController.js';


import { protect ,isAdmin } from '../middleware/authMiddleware.js';

router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate and send JWT token
      const token = user.generateAuthToken();
      res.json({ token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});
// user Full 

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile);
router.post('/createuser',createUser)



export default router;