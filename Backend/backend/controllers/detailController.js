import Hotel from '../models/DetailModel.js'


// POST /api/hotels
const createPackages = async (req, res) => {
  try {
    const { packageName, packageImage, description, hotel, places, modeOfTravel, inclusion,exclusion,cost} = req.body;

    // Create a new hotel instance
    const newHotel = new Hotel({
      packageName,
      packageImage,
      description,
      hotel,
      places,
      modeOfTravel,
      inclusion,
      exclusion,
      cost,
    });

    // Save the hotel to the database
    const savedHotel = await newHotel.save();

    res.status(201).json(savedHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/hotels
const getPackages = async (req, res) => {
    try {
      // Fetch all hotels from the database
      const hotels = await Hotel.find();
  
      res.status(200).json(hotels);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // GET /api/hotels/:id
const getPackageById = async (req, res) => {
    try {
      const hotelId = req.params.id;
  
      // Fetch the hotel by ID from the database
      const hotel = await Hotel.findById(hotelId);
  
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }
  
      res.status(200).json(hotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export {createPackages ,getPackages,getPackageById}
