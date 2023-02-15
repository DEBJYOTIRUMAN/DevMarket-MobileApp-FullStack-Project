import { User } from "../models";
import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { Order } from "../models";

const orderController = {
    async storeOrder(req, res, next) {
        let user;
        try {
            user = await User.findOne({ _id: req.user._id });
            if (!user) {
                return next(CustomErrorHandler.notFound());
            }
        } catch (err) {
            return next(err);
        }
        
        const orders = req.body;
        orders.map(async (order) => {
        // Validate
        const orderSchema = Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            price: Joi.number().required(),
            qty: Joi.number().required(),
            totalPrice: Joi.number().required(),
            brand: Joi.string().required(),
            image: Joi.string().required(),

        });
        const { error } = orderSchema.validate(order);

        if(error){
            return next(error);
        }

        const { _id, name, price, qty, totalPrice, brand, image } = order;

            let myOrder = new Order({
                userId: user._id,
                productId: _id,
                name: name,
                price: price,
                qty: qty,
                totalPrice: totalPrice,
                brand: brand,
                image: image,
            });
            let saveOrder;
            try {
                saveOrder = await myOrder.save();
            } catch (err) {
                return next(err);
            }
        });

        res.json("Saved");
    },
    async getOrder(req, res, next){
        let user;
        try{
             user = await User.findOne({ _id: req.user._id });
            if (!user){
                return next(CustomErrorHandler.notFound());
            }

        } catch(err){
            return next(err);
        }
        let documents;
        try {
            documents = await Order.find({
                userId: user._id
            }).select('-updatedAt -__v -_id').sort({ _id: -1 });
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
        return res.json(documents);
    },
};
export default orderController;
