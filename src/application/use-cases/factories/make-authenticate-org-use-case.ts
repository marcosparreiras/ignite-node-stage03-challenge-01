import PrismaOrgRepository from "../../../repositoies/prisma-org-repository";
import AuthenticateOrgUseCase from "../authenticate-org";

function makeAuthenticateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository();
  const useCase = new AuthenticateOrgUseCase(orgRepository);
  return useCase;
}

export default makeAuthenticateOrgUseCase;
