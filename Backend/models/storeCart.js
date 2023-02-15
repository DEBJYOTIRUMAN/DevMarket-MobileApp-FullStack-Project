import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    
    userId: { type: String, required: true },
    productId: [{ type: String, required: true }],
    quantity: [{ type: Number, required: true }],
    
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema, 'carts');