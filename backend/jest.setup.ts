import dotenv from "dotenv";
import prisma from "./src/db";

dotenv.config();

// ⏱️ Global timeout (optional but recommended)
jest.setTimeout(20000);

// 🔌 Properly close Prisma after all tests
afterAll(async () => {
  await prisma.$disconnect();
});
