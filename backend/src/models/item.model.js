import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

export default Item;