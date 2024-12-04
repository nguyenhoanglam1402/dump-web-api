// src/controllers/categoryController.ts
import { createCategoryService, getCategory } from '@services/category';
import { createOrder, getOrder } from '@services/order';
import { Request, Response } from 'express';
import { catchError } from 'src/decoration/http-catch';


class OrderController {

  @catchError
  public async create(req: Request, res: Response): Promise<void> {

    const { userId } = req.query
    const order = await createOrder(userId as string);
    res.status(201).json(order);  // Return the newly created category

  }

  @catchError
  public async get(_: Request, res: Response): Promise<void> {
    const result = await getOrder();
    res.status(200).json(result);  // Return the newly created category
  }
}

export default new OrderController();
