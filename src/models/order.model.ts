// src/db/models/Order.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';

class Order extends Model {
  public id!: string;
  public userId!: string;
  public totalPrice!: number;
  public status!: string;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'Orders',
    timestamps: true,
    paranoid: true,
  }
);

export default Order;
