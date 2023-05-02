const app = require("../src/server/index.js");
const supertest = require("supertest");
const request = supertest(app);

describe("Checking Endpoints", () => {
  test("is geoData route working properly?", async () => {
    const res = await request.get("/getData");
    expect(res.statusCode).toBe(200);
  });

  test("is weatherBit route working properly?", async () => {
    const res = await request.get("/weatherbit");
    expect(res.statusCode).toBe(200);
  });

  test("is pixaBay route working properly?", async () => {
    const res = await request.get("/pixabay");
    expect(res.statusCode).toBe(200);
  });
});
