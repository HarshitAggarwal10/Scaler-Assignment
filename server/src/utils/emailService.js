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
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Email send error:', error);
    // Don't throw error, just log it
  }
};

exports.sendOrderConfirmation = async (email, user, order) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #f5f5f5; padding: 20px; text-align: center;">
        <h1 style="color: #FFB800; margin: 0;">Order Confirmed! ✓</h1>
        <p style="color: #666; margin: 5px 0;">Thank you for your order</p>
      </div>
      
      <div style="padding: 20px; background: white;">
        <p style="color: #333;">Hello <strong>${user.name}</strong>,</p>
        <p style="color: #666;">Thank you for shopping with Flipcart! Your order has been successfully placed.</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Order Details</h3>
          <p style="color: #666;"><strong>Order ID:</strong> <code>${order.id}</code></p>
          <p style="color: #666;"><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
          <p style="color: #666;"><strong>Total Amount:</strong> <span style="font-size: 18px; color: #2563eb;">₹${order.totalPrice}</span></p>
        </div>

        <div style="background: #f9f9f9; padding: 15px; margin: 20px 0;">
          <h4 style="color: #333; margin-top: 0;">📦 Items Ordered:</h4>
          ${order.items.map(item => `
            <div style="padding: 8px 0; border-bottom: 1px solid #ddd;">
              <p style="color: #666; margin: 0;"><strong>${item.title}</strong> x ${item.quantity}</p>
              <p style="color: #999; margin: 3px 0;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>
            </div>
          `).join('')}
        </div>

        <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0;">
          <h4 style="color: #333; margin-top: 0;">📍 Shipping Address:</h4>
          <p style="color: #666; margin: 5px 0;"><strong>${order.shippingAddress.name}</strong></p>
          <p style="color: #666; margin: 3px 0;">${order.shippingAddress.street}</p>
          <p style="color: #666; margin: 3px 0;">${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pinCode}</p>
          <p style="color: #666; margin: 5px 0;">📱 ${order.shippingAddress.phone}</p>
        </div>

        <div style="background: #fffbeb; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
          <h4 style="color: #333; margin-top: 0;">ℹ️ What's Next?</h4>
          <ul style="color: #666; margin: 0; padding-left: 20px;">
            <li>Your order is being processed</li>
            <li>We'll notify you once your package ships</li>
            <li>Estimated delivery: 5-7 business days</li>
            <li>Track your order anytime on Flipcart</li>
          </ul>
        </div>

        <div style="background: #f0fdf4; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0;">
          <h4 style="color: #333; margin-top: 0;">💰 SuperCoins Earned!</h4>
          <p style="color: #10b981;"><strong>You earned 5% SuperCoins on this order!</strong></p>
          <p style="color: #666; font-size: 12px;">Use SuperCoins for future purchases to get instant discounts.</p>
        </div>

        <p style="color: #666; margin-top: 30px;">If you have any questions, please contact our <strong>24x7 Customer Care</strong>.</p>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">Thank you for shopping with Flipcart!</p>
      </div>
      
      <div style="background: #f5f5f5; padding: 15px; text-align: center; color: #999; font-size: 12px;">
        <p style="margin: 5px 0;">© Flipcart - Your Trusted Online Shopping Partner</p>
        <p style="margin: 5px 0;">This is an automated email, please do not reply directly.</p>
      </div>
    </div>
  `;

  await this.sendEmail(email, '✓ Order Confirmed - Flipcart', html);
};

exports.sendOrderDeliveryNotification = async (email, user, order) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #10b981; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">Your Order Has Been Delivered! 📦</h1>
      </div>
      
      <div style="padding: 20px; background: white;">
        <p style="color: #333;">Hello <strong>${user.name}</strong>,</p>
        <p style="color: #666;">Great news! Your order has been successfully delivered. We hope you enjoy your purchase!</p>
        
        <div style="background: #f0fdf4; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">✓ Delivery Confirmed</h3>
          <p style="color: #666;"><strong>Order ID:</strong> <code>${order.id}</code></p>
          <p style="color: #666;"><strong>Delivered on:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
        </div>

        <div style="background: #f9f9f9; padding: 15px; margin: 20px 0;">
          <h4 style="color: #333; margin-top: 0;">📦 Items Delivered:</h4>
          ${order.items.map(item => `
            <div style="padding: 8px 0; border-bottom: 1px solid #ddd;">
              <p style="color: #666; margin: 0;"><strong>${item.title}</strong> x ${item.quantity}</p>
            </div>
          `).join('')}
        </div>

        <div style="background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
          <h4 style="color: #333; margin-top: 0;">⭐ Share Your Feedback</h4>
          <p style="color: #666;">Please rate your experience and help us improve our service. Your feedback is valuable!</p>
        </div>

        <p style="color: #999; font-size: 12px; margin-top: 20px;">If you have any issues with your order, please contact our support team immediately.</p>
      </div>
      
      <div style="background: #f5f5f5; padding: 15px; text-align: center; color: #999; font-size: 12px;">
        <p style="margin: 5px 0;">© Flipcart - Your Trusted Online Shopping Partner</p>
      </div>
    </div>
  `;

  await this.sendEmail(email, '✓ Your Order Has Been Delivered - Flipcart', html);
};
