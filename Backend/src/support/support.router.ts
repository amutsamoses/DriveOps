import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { supportTicketSchema } from "../validator";
import {
  listAllSupportTicketController,
  getSupportTicketByIdController,
  fetchUserSupportTicketsController,
  createSupportTicketController,
  updateSupportTicketController,
  deleteSupportTicketController,
} from "./support.controller";

export const supportTicketsRouter = new Hono();

// GET all support tickets - /api/support-tickets
supportTicketsRouter.get("/support-tickets", listAllSupportTicketController);

// GET a single support ticket by ID - /api/support-tickets/:id
supportTicketsRouter.get(
  "/support-tickets/:id",
  getSupportTicketByIdController
);

// POST create a new support ticket - /api/support-tickets
supportTicketsRouter.post(
  "/support-tickets",
  zValidator("json", supportTicketSchema),
  createSupportTicketController
);

// supportTicketsRouter.post("/support-ticket", createSupportTicketController)

// PUT update a support ticket by ID - /api/support-tickets/:id
supportTicketsRouter.put("/support-tickets/:id", updateSupportTicketController);

// DELETE a support ticket by ID - /api/support-tickets/:id
supportTicketsRouter.delete(
  "/support-tickets/:id",
  deleteSupportTicketController
);

// GET support tickets by user ID - /api/support-tickets/user/:userId
supportTicketsRouter.get(
  "/support-tickets/user/:userId",
  fetchUserSupportTicketsController
);
