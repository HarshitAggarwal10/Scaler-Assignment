const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const { sendOrderConfirmation } = require('../utils/emailService');

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Please provide shipping address and payment method',
      });
    }

    const cart = await Cart.findOne({ where: { userId: req.user.id } });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const orderItems = [];
    for (const item of cart.items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
          title: product.title,
          image: product.image,
        });
      }
    }

    const subtotal = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const tax = Math.round(subtotal * 0.05); // 5% tax
    const shippingCost = subtotal > 500 ? 0 : 40; // Free shipping above 500
    const totalPrice = subtotal + tax + shippingCost;

    const order = await Order.create({
      userId: req.user.id,
      items: orderItems,
      shippingAddress,
      subtotal,
      tax,
      shippingCost,
      totalPrice,
      paymentMethod,
      paymentStatus: 'completed',
      orderStatus: 'confirmed',
    });

    // Clear cart
    await cart.update({ items: [], totalPrice: 0 });

    // Update product stock
    for (let item of orderItems) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        await product.update({ stock: product.stock - item.quantity });
      }
    }

    // Send confirmation email
    const user = await User.findByPk(req.user.id);
    try {
      await sendOrderConfirmation(user.email, user, order);
    } catch (err) {
      console.log('Email not sent, but order created');
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      total: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if user owns this order
    if (order.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view this order',
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to cancel this order',
      });
    }

    if (order.orderStatus === 'shipped' || order.orderStatus === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a shipped or delivered order',
      });
    }

    await order.update({ orderStatus: 'cancelled' });

    // Restore stock
    for (let item of order.items || []) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        await product.update({ stock: product.stock + item.quantity });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const validStatuses = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${validStatuses.join(', ')}`,
      });
    }

    await order.update({ orderStatus: status });

    // Send email notification when order is delivered
    if (status === 'delivered') {
      const user = await User.findByPk(order.userId);
      const { sendOrderDeliveryNotification } = require('../utils/emailService');
      try {
        await sendOrderDeliveryNotification(user.email, user, order);
      } catch (err) {
        console.log('Delivery notification email not sent');
      }
    }

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
