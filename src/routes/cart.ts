import { Router } from "express";
import CartController from "src/controllers/cart";
import { authenticate } from "src/middleware/auth";

const PREFIX = 'cart'
const cartRouter = Router();

cartRouter.use(authenticate as any)

cartRouter.post(`/${PREFIX}`, CartController.addToCart);
cartRouter.delete(`/${PREFIX}/:cartId`, CartController.removeFromCart);
cartRouter.put(`/${PREFIX}`, CartController.updateCartItem);
cartRouter.get(`/${PREFIX}/:userId`, CartController.getCartItems);

export default cartRouter