import request from "supertest";
import app from "../app";
import prisma from "../db";
import bcrypt from "bcrypt";

jest.setTimeout(20000);
let adminToken: string;
let studentId: number;

describe("Admin Routes", () => {


  beforeAll(async () => {
    //  clean db
    await prisma.user.deleteMany();

    //  CREATE ADMIN
    await prisma.user.create({
      data: {
        name: "Admin Bhai",
        email: "admin@gmail.com",
        password: await bcrypt.hash("Admin@123", 10),
        role: "ADMIN",
      },
    });

    //  CREATE STUDENT
    const student = await prisma.user.create({
      data: {
        name: "Test Student",
        email: "student@test.com",
        password: await bcrypt.hash("Student@123", 10),
        role: "USER",
        isActive: false,
      },
    });

    studentId = student.id;

    //  LOGIN ADMIN
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@gmail.com",
        password: "Admin@123",
      });  

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    adminToken = res.body.token;
  });

  //  Unit Test 4
  it("should allow admin to get all students", async () => {
    const res = await request(app)
      .get("/api/admin/students")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.students).toBeDefined();
  });

  // Unit Test 5
  it("should activate a student by admin", async () => {
    const res = await request(app)
      .patch(`/api/admin/students/${studentId}/activate`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User activated successfully");
  });

});
