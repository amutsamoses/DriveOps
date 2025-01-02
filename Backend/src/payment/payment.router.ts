import { Hono } from "hono";
import {
  listAllPaymentsController,
  getSinglePaymentController,
  createPaymentController,
  updatePaymentController,
  deletePaymentController,
} from "./payment.controller";

export const paymentRouter = new Hono();

// GET all payments - /api/payments
paymentRouter.get("/payments", listAllPaymentsController);

// GET a single payment by ID - /api/payments/:id
paymentRouter.get("/payments/:id", getSinglePaymentController);

// POST create a new payment - /api/payments
// paymentRouter.post("/payments",zValidator("json", paymentSchema),userRoleAuth , createPayment);

// PUT update a payment by ID - /api/payments/:id
paymentRouter.put("/payments/:id", updatePaymentController);

// DELETE a payment by ID - /api/payments/:id
paymentRouter.delete("/payments/:id", deletePaymentController);

paymentRouter.post(
  "/create-checkout-session",
  createPaymentController.createCheckoutSession
);
paymentRouter.post("/webhook", createPaymentController.handleWebhook);
paymentRouter.get(
  "/test-checkout-session",
  createPaymentController.testingCreatedCheckoutSession
);
