import { Shop } from "../models";
import multer from "multer";
import path from "path";
import fs from 'fs';
import CustomErrorHandler from "../services/CustomErrorHandler";
import shopSchema from "../validators/shopValidator";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1E9
        )}${path.extname(file.originalname)}`;
        
        cb(null, uniqueName);
        
    }
});
const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 }
}).single('image_url'); // 5mb

const shopController = {
    async store(req, res, next) {
        //Multipart form data
        handleMultipartData(req, res, async (err) =>{
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
            
            const filePath = req.file.path;
            
            //Validation
            
            const { error } = shopSchema.validate(req.body);
            
            if (error) {
                // Delete the uploaded file
                fs.unlink(`${appRoot}/${filePath}`, (err) => {
                    if (err) {
                        return next(CustomErrorHandler.serverError(err.message));
                    }
                });
                return next(error);
               
            }
            
        
        const { name, categories, price, reviews, rating, shop_category, shipping } = req.body;
            let document;
            try {
                document = await Shop.create({
                    name, 
                    categories : JSON.parse(categories),
                    price, 
                    reviews, 
                    rating, 
                    shop_category,
                    shipping,
                    image_url: filePath,
                });
            } catch (err) {
                return next(err);
            }
            res.status(201).json(document);

        });
    },

    update(req, res, next) {
        handleMultipartData(req, res, async (err) =>{
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
            let filePath;
            if (req.file) {
                filePath = req.file.path;
            }
            
            //Validation
            
            const { error } = shopSchema.validate(req.body);
            if (error) {
                // Delete the uploaded file
                if(req.file){
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {
                        if (err) {
                            return next(CustomErrorHandler.serverError(err.message));
                        }
                    });
                }
                return next(error);
               
            }
            const { name, categories, price, reviews, rating, shop_category, shipping } = req.body;
            let document;
            try {
                document = await Shop.findOneAndUpdate({ _id: req.params.id }, {
                    name, 
                    categories : JSON.parse(categories),
                    price, 
                    reviews, 
                    rating,
                    shop_category,
                    shipping,
                    ...(req.file && { image_url: filePath })
                }, { new: true });
            } catch (err) {
                return next(err);
            }
            res.status(201).json(document);

        });
    },
    async destroy(req, res, next) {
        const document = await Shop.findOneAndRemove({ _id: req.params.id });
        if(!document){
            return next(new Error('Nothing to delete'));
        }
        //Image Delete
        const imagePath = document._doc.image;
        fs.unlink(`${appRoot}/${imagePath}`, (err) =>{
            if (err) {
                return next(CustomErrorHandler.serverError());
            }
        });
        res.json(document);
    },
    async index(req, res, next) {
        let specificDocuments;
        try{
            specificDocuments = await Shop.find().select('-updatedAt -__v');
     
        } catch(err){
            return next(CustomErrorHandler.serverError());
        }
  
        return res.json(specificDocuments);
    },
    
    async specificShippingShops(req, res, next) {
        let specificShopDocuments;
        try{
            specificShopDocuments = await Shop.find( { shipping: req.params.value } ).select('-updatedAt -__v');
            
            
        } catch(err){
            return next(CustomErrorHandler.serverError());
        }
        
        
        return res.json(specificShopDocuments);
    },
   
};
export default shopController;