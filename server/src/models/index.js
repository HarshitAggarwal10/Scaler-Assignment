const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const Order = require('./Order');
const Wishlist = require('./Wishlist');

// Define associations
const defineAssociations = () => {
  // User associations
  User.hasMany(Cart, { foreignKey: 'userId' });
  User.hasMany(Order, { foreignKey: 'userId' });
  User.hasMany(Wishlist, { foreignKey: 'userId' });

  // Cart associations
  Cart.belongsTo(User, { foreignKey: 'userId' });

  // Order associations
  Order.belongsTo(User, { foreignKey: 'userId' });

  // Wishlist associations
  Wishlist.belongsTo(User, { foreignKey: 'userId' });
};

module.exports = {
  User,
  Product,
  Cart,
  Order,
  Wishlist,
  defineAssociations,
};
