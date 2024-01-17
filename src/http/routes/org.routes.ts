import { FastifyInstance } from "fastify";
import OrgController from "../controllers/org-controllers";

async function orgRoutes(app: FastifyInstance) {
  const orgController = new OrgController();

  app.post("/orgs", orgController.create);
  app.post("/orgs/sessions", orgController.authenticate);
}

export default orgRoutes;
