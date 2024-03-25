
import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    packageName: String,
    packageImage: String,
    description: String,
    hotel : [
        {
            hotelName: String,
            hotelPrice: Number,
            facilities: [String],
        }
    ],
    places : [
        {
            placeName: String,
            placeImage: String,
            placeDescription: String
        }
    ],

    modeOfTravel : [
        {
            vehicleName: String,
            hours: Number,
            prize: Number,
           
        }
    ],

    inclusion: [String],
    exclusion: [String],
    cost: { type: Number, required: true ,default:0.0},
   
});

const packageModel = mongoose.model('allpackages', packageSchema);

export default packageModel;