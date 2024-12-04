import { DataTypes, Model } from 'sequelize';
import sequelize from 'src/config/database';
import Product from './product.model';

class Cart extends Model {
  public id!: string;
  public productId!: string;
  public amount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    timestamps: true,
    paranoid: true,
  }
);

export default Cart;
