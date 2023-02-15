import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    
    userId: { type: String, required: true },
    number: { type: String, required: true },
    validity: { type: String, required: true },
    cvv: { type: String, required: true },
    name: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema, 'payments');