import { Request, Response } from "express";
import { createProduct, getProduct, getProductId } from '@services/product'
import { catchError } from "src/decoration/http-catch";
import { IProductData } from "src/types/product.type";


class ProductController {
  @catchError
  public async get(req: Request, res: Response) {
    const result = await getProduct();

    res.status(200).json({
      message: 'OK',
      data: result
    })
  }

  @catchError
  public async getById(req: Request, res: Response) {
    const { id } = req.params
    if (!id && id.length) res.status(400).json({ message: "Bad request" })

    const result = await getProductId(id);
    if (!result) {
      res.status(404).json({
        message: 'Not found',
        data: []
      })
      return
    }
    res.status(200).json({
      message: 'OK',
      data: result
    })
  }

  @catchError
  public async createProduct(req: Request, res: Response) {
    const result = await createProduct(req.body as IProductData)
    res.status(200).json({ message: "OK", data: result })
  }
}

export default new ProductController();