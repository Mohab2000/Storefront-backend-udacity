import supertest from "supertest";
import app from "../../src/server";

const request = supertest(app); //req object

describe("Test basic endpoint", () => {
  it("Get / endpoint", async () => {
    const res = await request.get("/");
    expect(res.status).toBeTrue;
  });
});
