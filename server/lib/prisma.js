const { PrismaClient } = require("@prisma/client");

// PrismaClient 인스턴스를 하나만 생성하여 내보냅니다.
const prisma = new PrismaClient();

module.exports = prisma;
