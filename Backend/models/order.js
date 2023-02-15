import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true }
   
}, { timestamps: true });

export default mongoose.model('Order', orderSchema, 'orders');