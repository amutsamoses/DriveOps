import { Hono } from "hono";
import {
  listAllAuthenticationController,
  getAuthenticationByIdController,
  createAuthenticationController,
  updateAuthenticationController,
  deleteAuthenticationController,
} from "./authentication.controller";
import { zValidator } from "@hono/zod-validator";
import { authenticationSchema } from "../validator";

export const authenticationRouter = new Hono();

authenticationRouter.get("/authentication", listAllAuthenticationController);
authenticationRouter.get(
  "/authentication/:userId",
  getAuthenticationByIdController
);
authenticationRouter.post("/authentication", createAuthenticationController);
authenticationRouter.put(
  "/authentication/:userId",
  updateAuthenticationController
);
authenticationRouter.delete(
  "/authentication/:userId",
  deleteAuthenticationController
);

authenticationRouter.post(
  "/authentication",
  zValidator("json", authenticationSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createAuthenticationController
);

// export const authenticationRouter = (h: Hono) => {
//   h.get("/authentication", listAllAuthenticationController);
//   h.get("/authentication/:userId", getAuthenticationByIdController);
//   h.post("/authentication", createAuthenticationController);
//   h.put("/authentication/:userId", updateAuthenticationController);
//   h.delete("/authentication/:userId", deleteAuthenticationController);
// };
