import request from "supertest";
import app from "../app";
import prisma from "../db";
import bcrypt from "bcrypt";

jest.setTimeout(20000);

let userToken: string;

describe("User Routes", () => {

  beforeAll(async () => {
    await prisma.user.deleteMany();

    await prisma.user.create({
      data: {
        name: "Ram Kumar",
        email: "user_test@gmail.com",
        password: await bcrypt.hash("Ram@123", 10),
        role: "USER",
      },
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user_test@gmail.com",
        password: "Ram@123",
      });

    expect(res.statusCode).toBe(200);
    userToken = res.body.token;
  });

  it("should block profile update without token", async () => {
    const res = await request(app)
      .put("/api/user/profile")
      .send({ name: "Updated Name" });

    expect(res.statusCode).toBe(401);
  });

  it("should allow profile update with valid token", async () => {
    const res = await request(app)
      .put("/api/user/profile")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ name: "Updated Name" });

    expect(res.statusCode).toBe(200); // ✅ FIXED
    expect(res.body.success).toBe(true);
  });
});
     