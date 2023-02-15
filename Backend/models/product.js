import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { APP_URL } from '../config';

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        productType: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        brand: { type: String, required: true },
        bestseller: { type: Boolean, required: true},
        image: {
            type: String,
            required: true,
            get: (image) => {
                return `${APP_URL}/${image.replace('\\', '/')}`;
            }
        },
    },
    { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model('Product', productSchema, 'products');
