import express, { Express } from "express";
import { HttpStatus } from "./core/types/http-statuses";
import { driversRouter } from "./drivers/drivers.router";
import { testingRouter } from "./testing/testing.router";
import { setupSwagger } from "./core/swagger/setup-swagger";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(HttpStatus.Ok).send("Hello World!");
  });

  app.use("/drivers", driversRouter);
  app.use("/testing", testingRouter);

  setupSwagger(app);

  return app;
};
