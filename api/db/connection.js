// api/src/db/connection.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  prisma,
  connectDB: async () => {
    try {
      await prisma.$connect();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  }
};