const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? false : false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ PostgreSQL Connected');
    
    // Load and define associations
    const { defineAssociations } = require('../models/index');
    defineAssociations();
    console.log('✓ Model associations defined');
    
    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log('✓ Database synced');
    
    return true;
  } catch (error) {
    console.error('PostgreSQL Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };
