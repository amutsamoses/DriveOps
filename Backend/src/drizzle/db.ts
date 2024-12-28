import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Client } = pg;

export const client = new Client({
  connectionString: process.env.DATABASE_URL as string, // get the database URL from the environment
});

const main = async () => {
  await client.connect(); // connect to the database
};
main();

const db = drizzle(client, { schema, logger: true }); // create a Drizzle instance

export default db;
