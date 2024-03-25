import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'




//@desc   Register a new user
//route POST/api/users/auth
//@access Public


const registerUser =  async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}
 

//@desc   Auth user/settoken
//route POST/api/users/auth
//@access Public


const authUser = asyncHandler (async (req, res) =>{
  const { email, password } = req.body;
  
  const user = await User.findOne({ email});
  
  if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
    

      res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: user.token,

          success:true, 
          message :"Welcome to NOOLODY"
      });
  } else {
      res.status(401);
      throw new Error('Invalid email or password');
  }
  
  });
//@desc   Get User Profile
//route POST/api/users/profile
//@access Private


const getUserProfile = asyncHandler (async (req, res) =>{
    
  const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email
  }
      res.status(200).json(user);
      });
  

//@desc   Update User Profile
//route Put/api/users/profile
//@access Public


const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
     user.name = req.body.name || user.name;
     user.email = req.body.email || user.email;

     if (req.body.password) {
      user.password = req.body.password;
     }

     const updatedUser = await user.save();

     res.status(200).json({
       _id: updatedUser._id,
       name: updatedUser.name,
       email: updatedUser.email,
       role: updatedUser.role,
       token: updatedUser.token,

       success: true,
     });
  } else {
      res.status(404);
      throw new Error('User not found')
  }

  res.status(200).json({ message:'Update user profile'});
  });


//@desc   Logout user
//route POST/api/users/auth
//@access Public


const logoutUser = asyncHandler (async (req, res) =>{
    console.log("loguot");
    res.cookie('jwt', 'none', {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
  });

    res.status(200).json({ message:'User logged out'});
    });

    const createUser = asyncHandler(async (req, res) => {
      const { name, password, email } = req.body;
    
      // Validate request data (you may want to add more validation)
      if (!name || !password || !email) {
        return res.status(400).json({ success: false, message: 'Invalid data' });
      }
    
      // Check if the user already exists
      const userExists = await User.findOne({ email });
    
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
    
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
    
      // Create a new user
      const newUser = new User({
        name,
        password: hashedPassword,
        email,
      });
    
      // Save the user to the database
      await newUser.save();
    
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    });



    export{
        registerUser,
        authUser,
        getUserProfile,
        updateUserProfile,
        logoutUser,
      createUser

    };

