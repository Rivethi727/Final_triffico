import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    selectedHotelName: String,
    selectedHotelPrice: Number,
    selectedVehiclePrice: Number,
    notes:String,
    packageName: String,
    totalAmount: Number,
    selectedVehicleName: String,
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }],
      createdAt: {
        type: Date,
        default: Date.now
      }
      });
      

const bookingModel = mongoose.model('bookingDetails', bookingSchema);


export default bookingModel;