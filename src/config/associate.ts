import Cart from "src/models/cart.model";
import Category from "src/models/category.model";
import Invoice from "src/models/invoice.model";
import PaymentRoll from "src/models/invoice.model";
import OrderItem from "src/models/order-item.model";
import Order from "src/models/order.model";
import Product from "src/models/product.model";
import User from "src/models/user.model";

export default function initializeAssociations() {
  // This file ensures all relationships are loaded
  // Define relationships
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  // Order associations
  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
  Order.hasOne(Invoice, { foreignKey: 'orderId' });
  Invoice.belongsTo(Order, { foreignKey: 'orderId' });

  // Product associations
  Product.hasMany(OrderItem);
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });
  Product.belongsTo(Category, { foreignKey: 'categoryId' });
  Category.hasMany(Product, { foreignKey: 'categoryId' });

  Cart.belongsTo(Product, { foreignKey: 'productId' })
  User.hasMany(Cart, { foreignKey: 'userId' })
  Cart.belongsTo(User, { foreignKey: 'userId' })
}