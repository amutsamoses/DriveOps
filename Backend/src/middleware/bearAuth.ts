import { Hono, Context, Next } from "hono";
import { jwt, verify } from "hono/jwt";
import "dotenv/config";

export interface TPayload {
  sub: string;
  role: string;
  exp: number;
}

// authentiication middleware
export const verifyToken = async (
  token: string,
  secret: string
): Promise<TPayload | null> => {
  try {
    const decoded = (await verify(token, secret)) as unknown as TPayload;
    return decoded;
  } catch (error: any) {
    return null;
  }
};

// authorization middleware
export const bearAuthMiddleware = async (
  c: Context,
  next: Next,
  requiredRoles: string[]
) => {
  const token = c.req.header("Authorization");
  if (!token) {
    return c.json({ error: "No token provided" }, 401);
  }

  const decoded = await verifyToken(token, process.env.JWT_SECRET as string);
  if (!decoded) {
    return c.json({ error: "Invalid Token" }, 401);
  }

  if (!requiredRoles.includes(decoded.role) && decoded.role !== "superuser") {
    return c.json({ error: "Unauthorized Access" }, 401);
  }

  return next();
};

export const adminRoleAuth = async (c: Context, next: Next) => {
  await bearAuthMiddleware(c, next, ["admin"]);
};

export const userRoleAuth = async (c: Context, next: Next) => {
  await bearAuthMiddleware(c, next, ["user"]);
};

export const adminOrUserRoleAuth = async (c: Context, next: Next) => {
  await bearAuthMiddleware(c, next, ["admin", "user"]);
};
