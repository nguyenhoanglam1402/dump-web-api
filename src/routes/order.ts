import { Router } from "express";
import OrderController from "src/controllers/order";
import { authenticate } from "src/middleware/auth";

const PREFIX = 'order'
const orderRouter = Router();

orderRouter.use(authenticate as any)

orderRouter.get(`/${PREFIX}`, OrderController.get)
orderRouter.post(`/${PREFIX}`, OrderController.create)

export default orderRouter