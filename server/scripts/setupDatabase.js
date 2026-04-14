require('dotenv').config();
const { Client } = require('pg');

const createDatabase = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres', // Connect to default database first
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL server');

    // Check if database exists
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [process.env.DB_NAME]
    );

    if (result.rows.length === 0) {
      // Create database
      await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
      console.log(`✓ Database '${process.env.DB_NAME}' created successfully`);
    } else {
      console.log(`✓ Database '${process.env.DB_NAME}' already exists`);
    }

    await client.end();
    return true;
  } catch (error) {
    console.error('Error creating database:', error.message);
    await client.end();
    process.exit(1);
  }
};

createDatabase();
