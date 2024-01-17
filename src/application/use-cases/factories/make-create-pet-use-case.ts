import PrismaOrgRepository from "../../../repositoies/prisma-org-repository";
import PrismaPetRepository from "../../../repositoies/prisma-pet-repository";
import CreatePetUseCase from "../create-pet";

function makeCreatePetUseCase() {
  const petRepository = new PrismaPetRepository();
  const orgRepository = new PrismaOrgRepository();
  const useCase = new CreatePetUseCase(petRepository, orgRepository);
  return useCase;
}

export default makeCreatePetUseCase;
