import Pet, { PetProps } from "../../enterprise/entity/pet";
import OrgRepository from "../repositories/org-repository";
import PetRepository from "../repositories/pet-repository";

interface FetchPetsByCityUseCaseRequest {
  city: string;
  filters?: Partial<PetProps>;
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[];
}

class FetchPetsByCityUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository
  ) {}

  async execute({
    city,
    filters,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const orgsInCity = await this.orgRepository.fetchManyByCity(city);

    let pets: Pet[] = [];

    for (let org of orgsInCity) {
      const orgPets = await this.petRepository.fetchManyByOrgId(
        org.id.toString(),
        filters
      );

      pets.push(...orgPets);
    }

    return { pets };
  }
}

export default FetchPetsByCityUseCase;
