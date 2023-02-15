import Joi from 'joi';
const shopSchema = Joi.object({
    name: Joi.string().required(),
    categories: Joi.string().required(),
    price: Joi.string().required(),
    reviews: Joi.number().required(),
    rating: Joi.number().required(),
    shop_category: Joi.string().required(),
    shipping: Joi.string().required(),
    image_url: Joi.string(),
});
export default shopSchema;