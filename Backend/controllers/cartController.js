import { User } from "../models";
import { Cart } from "../models";
import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";
const cartController = {
  async storeCart(req, res, next) {
    let user;
    try {
      user = await User.findOne({ _id: req.user._id });
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
    } catch (err) {
      return next(err);
    }
    // Validate
    const cartSchema = Joi.object({
      productId: Joi.array().items(Joi.string()).required(),
      quantity: Joi.array().items(Joi.number()).required(),
    });

    const { error } = cartSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    const { productId, quantity } = req.body;
    let saveCart;
    try {
      saveCart = await Cart.findOneAndUpdate({userId: user._id}, {productId: productId, quantity: quantity}, {new: true, upsert: true});
    } catch (err) {
      return next(err);
    }
    res.json(saveCart);
  },
  async getCart(req, res, next) {
    let user;
    try {
      user = await User.findOne({ _id: req.user._id });
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
    } catch (err) {
      return next(err);
    }
    let documents;
    try {
      documents = await Cart
        .findOne({
          userId: user._id,
        })
        .select("-updatedAt -__v -_id -userId -createdAt");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    if(!documents){
      return res.json({})
    }
    return res.json(documents);
  },
  async deleteCart(req, res, next) {
    let user;
    try {
      user = await User.findOne({ _id: req.user._id });
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
    } catch (err) {
      return next(err);
    }
    const document = await Cart.remove({ userId: user._id });
    if (!document) {
      return next(new Error("Nothing to delete"));
    }
    res.json(document);
  },
};
export default cartController;
