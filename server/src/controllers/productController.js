const Product = require('../models/Product');
const { Op } = require('sequelize');

exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;

    let where = { isActive: true };

    if (category) {
      where.category = category;
    }

    if (search) {
      where = {
        ...where,
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await Product.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
    });

    res.status(200).json({
      success: true,
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
      products: rows,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.findAll({
      attributes: [[require('sequelize').fn('DISTINCT', require('sequelize').col('category')), 'category']],
      raw: true,
    });

    const categoryList = categories.map(c => c.category).filter(c => c);

    res.status(200).json({
      success: true,
      categories: categoryList,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, image, images, category, stock, specifications } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      image,
      images: images || [image],
      category,
      stock,
      specifications,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
