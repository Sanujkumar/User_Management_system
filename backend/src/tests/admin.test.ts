import request from "supertest";
import app from "../app";

describe("User Routes", () => {

  //  Unit Test 3
  it("should block profile update without token", async () => {
    const res = await request(app)
      .put("/api/user/profile")
      .send({
        name: "New Name"
      });

    expect(res.statusCode).toBe(401);
  });

});
