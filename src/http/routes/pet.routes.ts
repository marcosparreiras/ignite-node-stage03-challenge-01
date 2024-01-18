import { FastifyInstance } from "fastify";
import PetControllers from "../controllers/pet-controllers";
import verifyJWT from "../middlewares/verify-jwt";

async function petRoutes(app: FastifyInstance) {
  const petControllers = new PetControllers();

  app.get("/pets/:id", petControllers.show);
  app.get("/pets/search/:city", petControllers.index);

  app.post("/pets", { onRequest: [verifyJWT] }, petControllers.create);
}

export default petRoutes;
