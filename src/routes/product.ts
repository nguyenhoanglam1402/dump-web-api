import { Router } from "express";
import ProductController from "src/controllers/product";
import { authenticate } from "src/middleware/auth";

const PREFIX = 'products'
const productRouter = Router();

productRouter.get(`/${PREFIX}`, ProductController.get)
productRouter.get(`/${PREFIX}/:id`, ProductController.getById)
productRouter.post(`/${PREFIX}`, authenticate as any, ProductController.createProduct)

export default productRouter