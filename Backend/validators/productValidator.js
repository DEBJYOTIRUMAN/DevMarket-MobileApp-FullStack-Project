import Joi from 'joi';
const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    productType: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    brand: Joi.string().required(),
    bestseller: Joi.boolean().required(),
    image: Joi.string(),
});
export default productSchema;