import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      orderTimeMs: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      totalCostCents: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      products: {
        type: DataTypes.JSON, // guardamos directamente el array de productos
        allowNull: false
      }
    },
    {
      tableName: 'orders',
      timestamps: false
    }
  );
  
export default Order;