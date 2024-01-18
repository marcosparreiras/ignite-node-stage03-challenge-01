import "dotenv/config";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";
import type { Environment } from "vitest";

//'postgresql://docker:docker@tlocalhos:5432/nodestage3?schema=public'

// 1. Create a folder named "vitest-environment-prisma"
// 2. cd to this folder
// 3. run: npm init -y
// 4. create a script for environment setup
// 5. change the "main" attribute in package.jon for the name of your created script
// 6. run: npm link
// 7. cd back to your main project folder
// 8. setup your vite.config.json
// test: {
//   environmentMatchGlobs: [["[path to the folder with the tests]/**", "prisma"]],
// },
// 9. run: npm link vitest-environment-prisma
// 10. you are ready to run your tests

const prisma = new PrismaClient();

function generateDataBaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide DATABASE_URL enviroment variable.");
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);
  return url.toString();
}

export default <Environment>{
  name: "custom",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const dataBaseUrl = generateDataBaseUrl(schema);
    process.env.DATABASE_URL = dataBaseUrl;
    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );
        await prisma.$disconnect();
      },
    };
  },
};
