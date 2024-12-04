import Cart from "src/models/cart.model"
import OrderItem from "src/models/order-item.model"
import Order from "src/models/order.model"
import Product from "src/models/product.model"
import { IOrderItem } from "src/types/product.type"

export const getOrder = (userId: string) => {
  return Order.findAll({ where: { userId: userId } })
}

export const getOrderId = (id: string) => {
  return Order.findOne({
    where: {
      id: id
    }
  })
}


export const addCart = async (userId: string, productId: string, quantity: number) => {
  // Check if the product exists
  const product = await Product.findOne({ where: { id: productId } });
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if the product is already in the cart
  const cartItem = await Cart.findOne({ where: { userId, productId } });

  if (cartItem) {
    // Update quantity if product is already in the cart
    cartItem.amount += quantity;
    await cartItem.save();
  } else {
    // Add new product to the cart
    await Cart.create({ userId, productId, amount: quantity });
  }

  return { message: 'Product added to cart successfully' };
}

export const deleteCart = async (userId: string, productId: string) => {
  const cartItem = await Cart.findOne({ where: { userId, productId } });

  if (!cartItem) {
    throw new Error('Product not found in cart');
  }

  await cartItem.destroy();

  return { message: 'Product removed from cart successfully' };
}

export const updateCartItem = async (userId: string, productId: string, quantity: number) => {
  const cartItem = await Cart.findOne({ where: { userId, productId } });

  if (!cartItem) {
    throw new Error('Product not found in cart');
  }

  if (quantity <= 0) {
    // Remove item if quantity is set to 0 or less
    await cartItem.destroy();
    return { message: 'Product removed from cart as quantity was set to 0' };
  }

  cartItem.amount = quantity;
  await cartItem.save();

  return { message: 'Cart updated successfully' };
}

export const getCartItems = async (userId: string) => {
  const cartItems = await Cart.findAll({
    where: { userId },
    include: [
      {
        model: Product, // Include product details
        attributes: ['id', 'name', 'price', 'description'],
      },
    ],
  });

  if (!cartItems.length) {
    return { message: 'Cart is empty', items: [] };
  }

  return { message: 'Cart fetched successfully', items: cartItems };
}


