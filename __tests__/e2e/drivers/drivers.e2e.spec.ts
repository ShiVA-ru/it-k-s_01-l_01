import request from "supertest";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import express, { Express } from "express";
import { setupApp } from "../../../src/setup-app";
import { DriverInputDto } from "../../../src/drivers/dto/driver.input-dto";

//в видео Димыча app импортируется из index,
// в репозитории импортируется setup-app и в уроке создается экземпляр app - const app = express();
// какой из вариантов правильный?
describe("testing for /drivers", () => {
  const app = express();
  setupApp(app);

  const testDriverData: DriverInputDto = {
    name: "Valentin",
    phoneNumber: "123-456-7890",
    email: "valentin@example.com",
    vehicleMake: "BMW",
    vehicleModel: "X5",
    vehicleYear: 2021,
    vehicleLicensePlate: "ABC-123",
    vehicleDescription: null,
    vehicleFeatures: [],
  };

  beforeAll(async () => {
    await request(app).delete("/testing/all-data").expect(HttpStatus.NoContent);
  });

  it("should create entity with correct input data", async () => {
    const newDriver: DriverInputDto = {
      ...testDriverData,
    };

    await request(app)
      .post("/drivers")
      .send(newDriver)
      .expect(HttpStatus.Created);
  });

  it("should return entity list", async () => {
    await request(app)
      .post("/drivers")
      .send({ ...testDriverData, name: "Another Driver" })
      .expect(201);

    await request(app)
      .post("/drivers")
      .send({ ...testDriverData, name: "Another Driver2" })
      .expect(201);

    const driverListResponse = await request(app).get("/drivers").expect(200);

    expect(driverListResponse.body).toBeInstanceOf(Array);
    expect(driverListResponse.body.length).toBeGreaterThanOrEqual(2);
  });

  it("should return entity by id", async () => {
    const createResponse = await request(app)
      .post("/drivers")
      .send({ ...testDriverData, name: "Another Driver" })
      .expect(201);

    const getResponse = await request(app)
      .get(`/drivers/${createResponse.body.id}`)
      .expect(200);

    expect(getResponse.body).toEqual({
      ...createResponse.body,
      id: expect.any(Number),
      createdAt: expect.any(String),
    });
  });
});
