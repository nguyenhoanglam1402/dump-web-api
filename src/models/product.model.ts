import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database'
import Category from './category.model';
import Cart from './cart.model';
import PaymentRoll from './invoice.model';

class Product extends Model {
  public id!: string;
  public name!: string;
  public feature!: string[];
  public description!: string;
  public price!: number;
  public amountInStore!: number;
  public categoryId!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pictureURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feature: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amountInStore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,

    },
  },
  {
    sequelize,
    modelName: 'Product',
    timestamps: true,
    paranoid: true, // Enables soft deletes (deletedAt column)
  }
);



export default Product;
