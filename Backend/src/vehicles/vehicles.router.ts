import { Hono } from "hono";
import {
  listAllVehiclesController,
  getVehicleByIdController,
  createVehicleController,
  updateVehicleController,
  deleteVehicleController,
} from "./vehicles.controller";
import { vehicleSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";

export const vehiclesRouter = new Hono();

// GET all vehicles - /api/vehicles
vehiclesRouter.get("/vehicles", listAllVehiclesController);

// // GET a single vehicle by ID - /api/vehicles/:id
// vehiclesRouter.get(
//   "/vehicles/:id",
//   zValidator("json", vehicleSchema),
//   getVehicleByIdController
// );

vehiclesRouter.get("/vehicles/:id", getVehicleByIdController);

// POST create a new vehicle - /api/vehicles
vehiclesRouter.post("/vehicles", createVehicleController);

// PUT update a vehicle by ID - /api/vehicles/:id
vehiclesRouter.put("/vehicles/:id", updateVehicleController);

// DELETE a vehicle by ID - /api/vehicles/:id
vehiclesRouter.delete("/vehicles/:id", deleteVehicleController);
