import Trip from '../models/tripModel.js';

export const createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.status(201).json({ message: 'Trip created successfully', data: trip });
  } catch (error) {
    res.status(500).json({ message: 'Error creating trip', error });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const updatedTrip = await Trip.findByIdAndUpdate(tripId, req.body, { new: true });

    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip updated successfully', data: updatedTrip });
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip', error });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error getting all trips', error });
  }
};

export const getTripById = async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error getting trip by ID', error });
  }
};

export const getTripByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const trip = await Trip.findOne({ userId: userId }).sort({ createdAt: -1 }).limit(1);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error getting trip by user ID', error });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const deletedTrip = await Trip.findByIdAndDelete(tripId);

    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip deleted successfully', data: deletedTrip });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error });
  }
};
