import express, { Express, Request, Response } from "express";
import { HttpStatus } from "./core/types/http-statuses";
import { db } from "./db/in-memory.db";
import { driversRouter } from "./drivers/drivers.router";
import { testingRouter } from "./testing/testing.router";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(HttpStatus.Ok).send("Hello World!");
  });

  app.use("/drivers", driversRouter);
  app.use("/testing", testingRouter);

  return app;
};
