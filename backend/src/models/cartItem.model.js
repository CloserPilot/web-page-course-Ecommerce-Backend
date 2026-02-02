import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CartItem = sequelize.define('CartItem',
    {
      productId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      deliveryOptionId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'cart_items',
      timestamps: false
    }
  );

export default CartItem;