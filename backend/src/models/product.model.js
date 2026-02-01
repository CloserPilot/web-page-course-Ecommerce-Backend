import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,        // UUID como en tu ejemplo
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Guardamos rating como JSON para mantener stars y count juntos
  rating: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: { stars: 0, count: 0 }
  },
  priceCents: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Array de keywords
  keywords: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  }
}, {
  tableName: 'products',
  timestamps: true // opcional: crea createdAt y updatedAt
});

export default Product;
