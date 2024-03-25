import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    userName: String,
    phoneNo: Number,
    address: String,
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }],
    
});

const orderModel = mongoose.model('orderDetails', orderSchema);


export default orderModel;