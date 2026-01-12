import express, { Request, Response } from "express";
import { HttpStatus } from "../core/types/http-statuses";
import { db } from "../db/in-memory.db";

export const testingRouter = express.Router();

testingRouter.get("/", (req: Request, res: Response) => {
  res.status(HttpStatus.Ok).send("testing url");
});

testingRouter.delete("/all-data", (req, res) => {
  db.drivers = [];
  res.sendStatus(HttpStatus.NoContent);
});
