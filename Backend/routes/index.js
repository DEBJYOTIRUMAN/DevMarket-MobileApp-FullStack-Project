import express from 'express';
const router = express.Router();
import { registerController, loginController, userController, refreshController, productController, cartController, shopController, addressController, orderController, contactController, paymentController } from '../controllers';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';

// Login Routes
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/me', auth, userController.me);
router.post('/refresh', refreshController.refresh);
router.post('/logout', auth, loginController.logout);

// Products Routes
router.post('/products', [auth, admin], productController.store);
router.put('/products/:id', [auth, admin], productController.update);
router.delete('/products/:id', [auth, admin], productController.destroy);
router.get('/products', productController.index);
router.get('/products/:id', productController.show);
router.get('/products/search/:name', productController.showName);
router.get('/products/specific/:value', productController.specificProducts);
router.get('/products/specific/brand/:value', productController.specificBrandProducts);
router.get('/products/specific/category/:value', productController.specificCategoryProducts);
router.get('/products/bestseller/:value', productController.bestsellerProducts);
router.post('/products/cart-items', productController.getProducts);

// Cart Routes
router.post('/user-cart', auth, cartController.storeCart);
router.get('/user-cart', auth, cartController.getCart);
router.delete('/user-cart/delete', auth, cartController.deleteCart);

// Shop Routes
router.post('/shops', [auth, admin], shopController.store);
router.put('/shops/:id', [auth, admin], shopController.update);
router.delete('/shops/:id', [auth, admin], shopController.destroy);
router.get('/shops', shopController.index);
router.get('/shops/:value', shopController.specificShippingShops);

// Address Routes
router.post('/address', auth, addressController.storeAddress);
router.get('/address', auth, addressController.getAddress);

// Payment Routes
router.post('/payment', auth, paymentController.storePayment);
router.get('/payment', auth, paymentController.getPayment);

// Order Routes
router.post('/order', auth, orderController.storeOrder);
router.get('/order', auth, orderController.getOrder);

// Contact Route
router.post('/contact', contactController.storeContact);

export default router;
