import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
   
}, { timestamps: true });

export default mongoose.model('Address', addressSchema, 'addresses');