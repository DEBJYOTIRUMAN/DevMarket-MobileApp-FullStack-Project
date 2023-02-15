import { User } from "../models"; 
import Joi from 'joi';
import CustomErrorHandler from "../services/CustomErrorHandler"; 
import { Address } from "../models";


const addressController = {
    async storeAddress(req, res, next){
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
        const addressSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            address: Joi.string().required(),
            state: Joi.string().required(),
            pincode: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
            
        });
        
        const { error } = addressSchema.validate(req.body);

        if(error){
            return next(error);
        }
        const { name, email, phone, address, state, pincode } = req.body;
        let saveAddress;
        try{
            saveAddress = await Address.findOneAndUpdate({userId: user._id}, {
            name: name,
            email: email,
            phone: phone,
            address: address,
            state: state,
            pincode: pincode,
            }, {new: true, upsert: true});
           
        } catch(err){
            return next(err);
        }
        res.json(saveAddress);

    },
    async getAddress(req, res, next){
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
            documents = await Address.findOne({
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
export default addressController;