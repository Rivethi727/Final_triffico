

import mongoose from 'mongoose';

const tourPlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  attractions: [{ type: String, required: true }],
});

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  accommodation: {
    name: { type: String, required: true },
    type: { type: String, required: true },
    facilities: [String],
    costPerNight: { type: Number, required: true },
    
  },
  tourPlaces: [
    tourPlaceSchema,
    tourPlaceSchema,
    tourPlaceSchema,
    // Add more tourPlaceSchema objects as needed
  ],
  modeOfTravel: {
    type: String,
    enum: ['Flight', 'Train', 'Bus', 'Car', 'walking '],
    required: true,
  },
  duration: { type: Number, required: true }, // in days
  cost: { type: Number, required: true },
  inclusion: [String],
  exclusion: [String],
  departureCity: { type: String, required: true },
  departureDate: { type: Date, required: true },
  images: [String],
});

const Package = mongoose.model('Package', packageSchema);

export default Package;
