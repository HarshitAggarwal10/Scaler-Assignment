const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ where: { userId: req.user.id } });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [],
        totalPrice: 0,
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ where: { userId: req.user.id } });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [
          {
            productId,
            quantity,
            price: product.price,
          },
        ],
        totalPrice: product.price * quantity,
      });
    } else {
      const items = cart.items || [];
      const itemIndex = items.findIndex((item) => item.productId === productId);

      if (itemIndex > -1) {
        items[itemIndex].quantity += quantity;
      } else {
        items.push({
          productId,
          quantity,
          price: product.price,
        });
      }

      cart.items = items;
      cart.totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: 'Product added to cart',
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ where: { userId: req.user.id } });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const items = (cart.items || []).filter((item) => item.productId !== productId);
    cart.items = items;
    cart.totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Product removed from cart',
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be greater than 0' });
    }

    const product = await Product.findByPk(productId);
    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ where: { userId: req.user.id } });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const items = cart.items || [];
    const itemIndex = items.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Item not in cart' });
    }

    items[itemIndex].quantity = quantity;
    cart.items = items;
    cart.totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ where: { userId: req.user.id } });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
