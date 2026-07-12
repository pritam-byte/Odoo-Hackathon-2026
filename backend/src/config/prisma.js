/*
  DATABASE TEAMMATE INTEGRATION FILE

  This is the usual Prisma Client configuration.
  Keep it ready, but do not use it until your teammate
  provides the Prisma schema and DATABASE_URL.
*/

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;