import express, { Express, Request, Response } from "express";
import { HttpStatus } from "./core/types/http-statuses";
import { Driver } from "./drivers/types/driver";
import { db } from "./db/in-memory.db";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get("/", (req, res) => {
    res.status(HttpStatus.Ok).send("Hello World!");
  });

  app.get("/drivers", (req, res) => {
    res.status(HttpStatus.Ok).send(db.drivers);
  });

  app.get("/drivers/:id", (req, res) => {
    const driver = db.drivers.find((driver) => driver.id === +req.params.id);

    if (!driver) {
      res.status(HttpStatus.NotFound).send({ message: "Driver not found" });
    }

    res.status(HttpStatus.Ok).send(driver);
  });

  app.post("/drivers", (req, res) => {
    const newDriver: Driver = {
      id: +new Date(),
      createdAt: new Date(),
      ...req.body,
    };
    db.drivers.push(newDriver);
    res.status(HttpStatus.Created).send(newDriver);
  });

  app.get("/testing", (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send("testing url");
  });

  app.delete("/testing/all-data", (req, res) => {
    db.drivers = [];
    res.sendStatus(HttpStatus.NoContent);
  });

  return app;
};
