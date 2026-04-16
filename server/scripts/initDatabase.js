require('dotenv').config();
const { connectDB, sequelize } = require('../src/config/database');

const sync = async () => {
  try {
    console.log('🔄 Synchronizing database...');
    await connectDB();
    
    // Force sync to update ENUM values
    await sequelize.sync({ force: true });
    console.log('✅ Database synchronized successfully!');

    console.log('\n📝 Now running the complete seed...');
    require('./seedDatabaseComplete.js');
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
};

sync();
