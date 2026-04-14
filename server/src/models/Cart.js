const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Cart = sequelize.define(
  'Cart',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    items: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    indexes: [{ fields: ['userId'] }],
  }
);

Cart.belongsTo(User, { foreignKey: 'userId' });

module.exports = Cart;
