import dotenv from 'dotenv';
dotenv.config();

import Prisma from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = Prisma;

// 1. Setup traditional pg Pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Wrap it in the Prisma Driver Adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to Prisma 7
const prisma = new PrismaClient({ adapter });

export default prisma;
