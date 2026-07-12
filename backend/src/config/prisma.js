const dotenv = require('dotenv');
dotenv.config();

const { PrismaClient } = require('@prisma/client');
const pg = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

// 1. Setup traditional pg Pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Wrap it in the Prisma Driver Adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to Prisma 7
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
