import Joi from 'joi';
import { Contact } from "../models";


const contactController = {
    async storeContact(req, res, next){
        // Validate
        const contactSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            message: Joi.string().required(),
            
        });
        
        const { error } = contactSchema.validate(req.body);

        if(error){
            return next(error);
        }
        const { name, email, message } = req.body;
        
        const contact = new Contact({
            name: name,
            email: email,
            message: message,
        });
        let saveContact;
        try{
            saveContact = await contact.save();
           
        } catch(err){
            return next(err);
        }
        res.json(saveContact);

    }
};
export default contactController;
