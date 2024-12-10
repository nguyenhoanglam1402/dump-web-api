// src/controllers/categoryController.ts
import { addCart, deleteCart, getCartItems, updateCartItem } from '@services/cart';
import { Request, Response } from 'express';
import { catchError } from 'src/decoration/http-catch';


class CartController {

  @catchError
  public async addToCart(req: Request, res: Response): Promise<void> {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
      res.status(400).json({ error: 'userId, productId, and quantity are required' });
      return;
    }

    const response = await addCart(userId, productId, quantity);
    res.status(200).json(response);
  }

  @catchError
  public async removeFromCart(req: Request, res: Response) {
    const { cartId } = req.params;

    if (!cartId) {
      res.status(400).json({ error: 'cartId is required' });
      return
    }
    const response = await deleteCart(cartId);
    res.status(200).json(response);
  }

  @catchError
  public async updateCartItem(req: Request, res: Response) {
    const { id, quantity } = req.body;

    if (!id || quantity === undefined) {
      res.status(400).json({ error: 'userId, productId, and quantity are required' });
      return
    }

    const response = await updateCartItem(id, quantity);
    res.status(200).json(response);

  }

  @catchError
  async getCartItems(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: 'userId is required' });
      return
    }

    const response = await getCartItems(userId);
    res.status(200).json(response);
  }
}

export default new CartController();
