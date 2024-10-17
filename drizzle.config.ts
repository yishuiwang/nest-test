import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: "postgresql://postgres:mysecretpassword@localhost:5432/postgres"
  },
  migrations: {
    table: 'journal', 
    schema: 'drizzle', 
  },
});