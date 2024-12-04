// src/db/models/Invoice.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';
import Order from './order.model';

class Invoice extends Model {
  public id!: string;
  public orderId!: string;
  public userId!: string;
  public totalAmount!: number;
  public billingAddress!: string;
  public paymentStatus!: string;
}

Invoice.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Order,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    billingAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unpaid',
    },
  },
  {
    sequelize,
    tableName: 'Invoices',
    timestamps: true,
    paranoid: true,
  }
);

export default Invoice;
