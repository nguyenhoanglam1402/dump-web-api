import { Router } from "express";
import CategoryController from "src/controllers/category";
import { authenticate } from "src/middleware/auth";

const PREFIX = 'category'
const categoryRouter = Router();


categoryRouter.get(`/${PREFIX}`, CategoryController.get)
categoryRouter.post(`/${PREFIX}`, authenticate as any, CategoryController.createCategory)

export default categoryRouter