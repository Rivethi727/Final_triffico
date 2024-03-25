import bookingModel from "../models/bookingModel.js";
// POST /api/booking

const getAllBookings = async (req, res) => {
  try {
    const allBookings = await bookingModel.find();
    res.status(200).json(allBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export   default getAllBookings 



    
  
  