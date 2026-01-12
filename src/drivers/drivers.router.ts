import express from "express";
import { HttpStatus } from "../core/types/http-statuses";
import { db } from "../db/in-memory.db";
import { vehicleInputDtoValidation } from "./validation/venicleInputDtoValidation";
import { createErrorMessages } from "../core/utils/error.utils";
import { Driver } from "./types/driver";

export const driversRouter = express.Router();

driversRouter.get("/drivers", (req, res) => {
  res.status(HttpStatus.Ok).send(db.drivers);
});

driversRouter.get("/drivers/:id", (req, res) => {
  const driver = db.drivers.find((driver) => driver.id === +req.params.id);

  if (!driver) {
    res.status(HttpStatus.NotFound).send({ message: "Driver not found" });
  }

  res.status(HttpStatus.Ok).send(driver);
});

driversRouter.post("/drivers", (req, res) => {
  const errors = vehicleInputDtoValidation(req.body);

  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
    return;
  }

  const newDriver: Driver = {
    id: +new Date(),
    createdAt: new Date(),
    ...req.body,
  };
  db.drivers.push(newDriver);
  res.status(HttpStatus.Created).send(newDriver);
});
