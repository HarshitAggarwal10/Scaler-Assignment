const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ where: { userId: req.user.id } });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId: req.user.id,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ where: { userId: req.user.id } });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId: req.user.id,
        items: [{ productId, addedAt: new Date() }],
      });
    } else {
      const items = wishlist.items || [];
      const itemExists = items.some((item) => item.productId === productId);

      if (itemExists) {
        return res.status(400).json({
          success: false,
          message: 'Product already in wishlist',
        });
      }

      items.push({ productId, addedAt: new Date() });
      wishlist.items = items;
      wishlist.updatedAt = new Date();
      await wishlist.save();
    }

    res.status(200).json({
      success: true,
      message: 'Product added to wishlist',
      wishlist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ where: { userId: req.user.id } });

    if (!wishlist) {
      return res.status(404).json({ success: false, message: 'Wishlist not found' });
    }

    const items = (wishlist.items || []).filter((item) => item.productId !== productId);
    wishlist.items = items;
    wishlist.updatedAt = new Date();

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Product removed from wishlist',
      wishlist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
