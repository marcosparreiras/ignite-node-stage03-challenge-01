import PrismaOrgRepository from "../../../repositoies/prisma-org-repository";
import CreateOrgUseCase from "../create-org";

function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository();
  const useCase = new CreateOrgUseCase(orgRepository);
  return useCase;
}

export default makeCreateOrgUseCase;
