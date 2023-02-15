import { User } from "../models"; 
import Joi from 'joi';
import CustomErrorHandler from "../services/CustomErrorHandler"; 
import { Payment } from "../models";


const paymentController = {
    async storePayment(req, res, next){
        let user;
        try{
             user = await User.findOne({ _id: req.user._id });
            if (!user){
                return next(CustomErrorHandler.notFound());
            }
            
        } catch(err){
            return next(err);
        }
        // Validate
        const paymentSchema = Joi.object({
            number: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
            validity: Joi.string().length(7).required(),
            cvv: Joi.string().length(3).pattern(/^[0-9]+$/).required(),
            name: Joi.string().required(),
            
        });
        
        const { error } = paymentSchema.validate(req.body);

        if(error){
            return next(error);
        }
        const { number, validity, cvv, name } = req.body;
        let savePayment;
        try{
            savePayment = await Payment.findOneAndUpdate({userId: user._id}, {
                number: number,
                validity: validity,
                cvv: cvv,
                name: name,
            
            }, {new: true, upsert: true});
           
        } catch(err){
            return next(err);
        }
        res.json(savePayment);

    },
    async getPayment(req, res, next){
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
            documents = await Payment.findOne({
                userId: user._id
            }).select('-updatedAt -__v -_id -userId -createdAt');
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
        if(!documents){
            return res.json({})
          }
        return res.json(documents);
    },
};
export default paymentController;