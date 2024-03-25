import bookingModel from "../models/bookingModel.js";
// POST /api/booking
const createbooking = async (req, res) => {
    try {
      console.log('Request Body:', req.body);
      const {  startDate, endDate, selectedVehiclePrice, notes,userId, selectedHotelName,
        selectedHotelPrice ,packageName,
        totalAmount, selectedVehicleName} = req.body;
  
      // Create a new OrderDetails instance
      const newbookingDetail = new bookingModel({
        startDate,
        endDate,
        selectedVehiclePrice,
        notes,
        userId,
        selectedHotelName,
        selectedHotelPrice,
        packageName,
        totalAmount,
        selectedVehicleName
      });
  
      const savedbookingDetail = await newbookingDetail.save();
  
      res.status(201).json(savedbookingDetail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getbookingById = async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log(userId);
  
      // Fetch the hotel by ID from the database
      const booking = await  bookingModel.findOne({userId:userId})
     
      .sort({ createdAt: -1 }) 
      .limit(1);

      if (!booking) {
        return res.status(404).json({ error: 'booking not found' });
      }
  
      res.status(200).json(booking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // controllers/bookingController.js


const getAllBookings = async (req, res) => {
  try {
    const allBookings = await bookingModel.find();
    res.status(200).json(allBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createbooking,getbookingById, getAllBookings };


// export {createbooking,getbookingById}
    
  
  