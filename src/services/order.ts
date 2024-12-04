import Cart from "src/models/cart.model"
import Invoice from "src/models/invoice.model"
import OrderItem from "src/models/order-item.model"
import Order from "src/models/order.model"
import Product from "src/models/product.model"
import User from "src/models/user.model"
import { IOrderItem } from "src/types/product.type"

export const getOrder = () => {
  return Order.findAll()
}

export const getOrderId = (id: string) => {
  return Order.findOne({
    where: {
      id: id
    }
  })
}


export const createOrder = async (userId: string) => {
  const productsInCart = await Cart.findAll({ where: { userId } });
  const user = await User.findOne({ where: { id: userId } })

  if (!productsInCart.length) {
    throw new Error('Cart is empty');
  }

  const orderItems: IOrderItem[] = [];
  let totalPrice = 0;

  for (const cartItem of productsInCart) {
    const product = await Product.findOne({ where: { id: cartItem.productId } });

    if (!product) {
      throw new Error(`Product with id ${cartItem.productId} not found`);
    }

    const orderItem = {
      productId: cartItem.productId,
      userId,
      quantity: cartItem.amount,
      price: cartItem.amount * product.price,
    };

    orderItems.push(orderItem);
    totalPrice += orderItem.price;
  }

  // Create the order
  const order = await Order.create({ userId, totalPrice });

  for (const item of orderItems) {
    await OrderItem.create({ ...item, orderId: order.id });
  }

  // Clear the cart
  await Cart.destroy({ where: { userId } });

  // Generate invoice
  const invoice = await Invoice.create({
    orderId: order.id,
    userId,
    totalAmount: totalPrice,
    billingAddress: user?.address || ''
  });

  return { order, invoice };
};