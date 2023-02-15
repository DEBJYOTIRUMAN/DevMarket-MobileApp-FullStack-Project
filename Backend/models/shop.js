import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { APP_URL } from '../config';

const shopSchema = new Schema(
    {
        name: { type: String, required: true },
        categories: {type: Array, required: true},
        price: { type: String, required: true },
        reviews: {type: Number, required: true},
        rating: {type: Number, required: true},
        shop_category: {type: String, required: true},
        shipping: {type: String, required: true},
        image_url: {
            type: String,
            required: true,
            get: (image) => {
                return `${APP_URL}/${image.replace('\\', '/')}`;
            }
        },
    },
    { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model('Shop', shopSchema, 'shops');
