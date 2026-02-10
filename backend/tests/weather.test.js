import request from "supertest";
import app from "../src/app.js";

//api testing jest & supertest

describe("GET /weather/average", () => {
  it("returns 400 when params are missing", async () => {
    const res = await request(app).get("/weather/average");

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns average temperature for valid request", async () => {
    const res = await request(app)
      .get("/weather/average")
      .query({ city: "Kuala Lumpur", days: 2 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("averageTemperature");
    expect(res.body).toHaveProperty("unit", "C");
  });
});