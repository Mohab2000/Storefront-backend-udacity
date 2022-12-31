import supertest from "supertest";
import app from "../server";
import { Users } from "../models/user";

const request = supertest(app); //req object
const user = new Users();

describe("Test user endpoints", () => {
  it("Get users", async () => {
    const res = await request.get("/user");
    expect(res.status).toBeTrue;
  });
  it("Post user", async () => {
    const res = await request.post("/user");
    expect(res.status).toBeTrue;
  });
  it("Delete user", async () => {
    const res = await request.delete("/user/2"); //assuming that there is ID 2 in products database
    expect(res.status).toBeTrue;
  });
  it("Update user", async () => {
    const res = await request.put("/user/2"); //assuming that there is ID 2 in products database
    expect(res.status).toBeTrue;
  });
  it("Authenticate user", async () => {
    const res = await request.put("/user/authenticate");
    expect(res.status).toBeTrue;
  });
});

describe("User functions", () => {
  it("User should have create method", async () => {
    expect(user.createUser).toBeDefined();
  });
  it("User should have read method", async () => {
    expect(user.getAllUsers).toBeDefined();
  });
  it("User should have update method", async () => {
    expect(user.getUserById).toBeDefined();
  });
  it("User should have delete method", async () => {
    expect(user.deleteUserById).toBeDefined();
  });
  it("User should have authenticate method", async () => {
    expect(user.authenticateUser).toBeDefined();
  });
});
