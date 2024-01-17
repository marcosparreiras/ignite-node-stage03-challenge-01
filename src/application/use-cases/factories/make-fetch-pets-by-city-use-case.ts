import PrismaOrgRepository from "../../../repositoies/prisma-org-repository";
import PrismaPetRepository from "../../../repositoies/prisma-pet-repository";
import FetchPetsByCityUseCase from "../fetch-pets-by-city";

function makeFetchPetsByCityUseCase() {
  const orgRepository = new PrismaOrgRepository();
  const petRepository = new PrismaPetRepository();
  const useCase = new FetchPetsByCityUseCase(petRepository, orgRepository);
  return useCase;
}

export default makeFetchPetsByCityUseCase;
