import Fastify from "fastify";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import env from "../env";
import orgRoutes from "./routes/org.routes";
import petRoutes from "./routes/pet.routes";

const app = Fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "1d",
  },
});

app.register(orgRoutes);
app.register(petRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.format(),
    });
  }
  if (env.NODE_ENV !== "production") {
    console.log(error);
  }
  return reply.status(500).send({ message: "Internal server error" });
});

export default app;
