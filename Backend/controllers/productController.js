import { Product } from "../models";
import multer from "multer";
import path from "path";
import fs from "fs";
import CustomErrorHandler from "../services/CustomErrorHandler";
import productSchema from "../validators/productValidator";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});
const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image"); // 5mb

const productController = {
  async store(req, res, next) {
    //Multipart form data
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }

      const filePath = req.file.path;

      //Validation
      const { error } = productSchema.validate(req.body);
      if (error) {
        // Delete the uploaded file
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });
        return next(error);
      }

      const {
        name,
        price,
        productType,
        category,
        description,
        brand,
        bestseller,
      } = req.body;
      let document;
      try {
        document = await Product.create({
          name,
          price,
          productType,
          category,
          description,
          brand,
          bestseller,
          image: filePath,
        });
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },
  update(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }
      let filePath;
      if (req.file) {
        filePath = req.file.path;
      }

      //Validation
      const { error } = productSchema.validate(req.body);
      if (error) {
        // Delete the uploaded file
        if (req.file) {
          fs.unlink(`${appRoot}/${filePath}`, (err) => {
            if (err) {
              return next(CustomErrorHandler.serverError(err.message));
            }
          });
        }
        return next(error);
      }
      const {
        name,
        price,
        productType,
        category,
        description,
        brand,
        bestseller,
      } = req.body;
      let document;
      try {
        document = await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            name,
            price,
            productType,
            category,
            description,
            brand,
            bestseller,
            ...(req.file && { image: filePath }),
          },
          { new: true }
        );
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },
  async destroy(req, res, next) {
    const document = await Product.findOneAndRemove({ _id: req.params.id });
    if (!document) {
      return next(new Error("Nothing to delete"));
    }
    //Image Delete
    const imagePath = document._doc.image;
    fs.unlink(`${appRoot}/${imagePath}`, (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError());
      }
    });
    res.json(document);
  },
  async index(req, res, next) {
    let specificDocuments;
    try {
      specificDocuments = await Product.find().select("-updatedAt -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    return res.json(specificDocuments);
  },
  async show(req, res, next) {
    let document;
    try {
      document = await Product.findOne({ _id: req.params.id }).select(
        "-updatedAt -__v"
      );
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    return res.json(document);
  },
  async showName(req, res, next) {
    let document;
    try {
      document = await Product.find({
        name: { $regex: req.params.name, $options: "i" },
      }).select("-updatedAt -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    return res.json(document);
  },
  async specificProducts(req, res, next) {
    let specificDocuments;
    try {
      specificDocuments = await Product.find({
        productType: req.params.value,
      }).select("-updatedAt -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    return res.json(specificDocuments);
  },
  async specificBrandProducts(req, res, next) {
    let specificBrandDocuments;
    try {
      specificBrandDocuments = await Product.find({
        brand: req.params.value,
      }).select("-updatedAt -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    return res.json(specificBrandDocuments);
  },
  async specificCategoryProducts(req, res, next) {
    let specificCategoryDocuments;
    try {
      specificCategoryDocuments = await Product.find({
        category: req.params.value,
      }).select("-updatedAt -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    return res.json(specificCategoryDocuments);
  },
  async bestsellerProducts(req, res, next) {
    let bestsellerDocuments;
    try {
      bestsellerDocuments = await Product.find({
        productType: req.params.value,
        bestseller: true,
      }).select("-updatedAt -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    return res.json(bestsellerDocuments);
  },
  async getProducts(req, res, next) {
    let documents;
    try {
      documents = await Product.find({
        _id: { $in: req.body.ids },
      }).select("-updatedAt -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },
};
export default productController;
