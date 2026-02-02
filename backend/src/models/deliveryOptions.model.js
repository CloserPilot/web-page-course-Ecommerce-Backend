import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const DeliveryOptions = sequelize.define('DeliveryOption',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      deliveryDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceCents: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      tableName: 'delivery_options',
      timestamps: false
    });

export default DeliveryOptions;