const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Email send error:', error);
    // Don't throw error, just log it
  }
};

exports.sendOrderConfirmation = async (email, user, order) => {
  const html = `
    <h1>Order Confirmation</h1>
    <p>Hello ${user.name},</p>
    <p>Thank you for your order!</p>
    <h3>Order Details:</h3>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total Amount:</strong> ₹${order.totalPrice}</p>
    <h4>Shipping Address:</h4>
    <p>${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.zipCode}</p>
    <p>Order Status: ${order.orderStatus}</p>
    <p>Thank you for shopping with us!</p>
  `;

  await this.sendEmail(email, 'Order Confirmation', html);
};
