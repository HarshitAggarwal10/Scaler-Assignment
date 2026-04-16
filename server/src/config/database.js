const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // required for Render
    },
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected');

    // Load and define associations
    const { defineAssociations } = require('../models/index');
    defineAssociations();
    console.log('✓ Model associations defined');

    // Sync models
    await sequelize.sync({ alter: true });
    console.log('✓ Database synced');

    return true;
  } catch (error) {
    console.error('❌ PostgreSQL Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };