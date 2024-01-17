import PrismaPetRepository from "../../../repositoies/prisma-pet-repository";
import GetPetUseCase from "../get-pet";

function makeGetPetUseCase() {
  const petRepository = new PrismaPetRepository();
  const useCase = new GetPetUseCase(petRepository);
  return useCase;
}

export default makeGetPetUseCase;
