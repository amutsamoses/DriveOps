import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";
import Stripe from "stripe";

const { Client } = pg;

export const client = new Client({
  connectionString: process.env.DATABASE_URL as string, // get the database URL from the environment
});

const main = async () => {
  try {
    await client.connect(); // connect to the database
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
  // await client.connect(); // connect to the database
  // console.log("Connected to the database");
};
main();

const db = drizzle(client, { schema, logger: true }); // create a Drizzle instance

export default db;

// stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY as string, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});
