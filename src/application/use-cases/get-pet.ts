import Pet from "../../enterprise/entity/pet";
import ResourceNotFoundError from "../errors/resource-not-found-error";
import PetRepository from "../repositories/pet-repository";

interface GetPetUseCaseRequest {
  petId: string;
}

interface GetPetUseCaseResponse {
  pet: Pet;
}

class GetPetUseCase {
  constructor(private petRetpository: PetRepository) {}

  async execute({
    petId,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petRetpository.findById(petId);
    if (!pet) {
      throw new ResourceNotFoundError();
    }
    return { pet };
  }
}

export default GetPetUseCase;
