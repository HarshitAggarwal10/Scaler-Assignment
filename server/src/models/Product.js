const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    },
    originalPrice: DataTypes.FLOAT,
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0, max: 100 },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    category: {
      type: DataTypes.ENUM(
        'Electronics',
        'Fashion',
        'Home',
        'Books',
        'Sports',
        'Toys',
        'Beauty',
        'Groceries',
        'Appliances',
        'Auto Accessories',
        '2 Wheelers',
        'Furniture'
      ),
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 4.5,
      validate: { min: 0, max: 5 },
    },
    reviews: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    specifications: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    seller: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    indexes: [
      { fields: ['category'] },
      { fields: ['price'] },
      { fields: ['title'] },
    ],
  }
);

module.exports = Product;
