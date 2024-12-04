// src/controllers/categoryController.ts
import { createCategoryService, getCategory } from '@services/category';
import { Request, Response } from 'express';
import { catchError } from 'src/decoration/http-catch';


class CategoryController {

  @catchError
  public async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name, pictureURL } = req.body;

      const newCategory = await createCategoryService({ name, pictureURL });

      res.status(201).json(newCategory);  // Return the newly created category
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  }

  @catchError
  public async get(_: Request, res: Response): Promise<void> {
    try {
      const result = await getCategory();

      res.status(200).json(result);  // Return the newly created category
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  }
}

export default new CategoryController();
