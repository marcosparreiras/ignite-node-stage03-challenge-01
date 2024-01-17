import Pet, {
  PetAgeOptions,
  PetEnergyLevelOptions,
  PetLevelOfIndependenceOptions,
  PetSizeOption,
  PetTypeOfEnvironmentOptions,
} from "../../enterprise/entity/pet";
import UniqueIdentity from "../../enterprise/entity/value-objects/unique-identity";
import InvalidParameterError from "../errors/invalid-parameter-error";
import ResourceNotFoundError from "../errors/resource-not-found-error";
import OrgRepository from "../repositories/org-repository";
import PetRepository from "../repositories/pet-repository";

interface CreatePetUseCaseRequest {
  name: string;
  description: string;
  age: string;
  size: string;
  energyLevel: string;
  levelOfIndependence: string;
  typeOfEnvironment: string;
  orgId: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

class CreatePetUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    levelOfIndependence,
    typeOfEnvironment,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId);
    if (!org) {
      throw new ResourceNotFoundError();
    }

    if (
      !Object.keys(PetAgeOptions).includes(age) ||
      !Object.keys(PetSizeOption).includes(size) ||
      !Object.keys(PetEnergyLevelOptions).includes(energyLevel) ||
      !Object.keys(PetLevelOfIndependenceOptions).includes(
        levelOfIndependence
      ) ||
      !Object.keys(PetTypeOfEnvironmentOptions).includes(typeOfEnvironment)
    ) {
      throw new InvalidParameterError();
    }

    const pet = Pet.create({
      name,
      description,
      age: PetAgeOptions[age as PetAgeOptions],
      size: PetSizeOption[size as PetSizeOption],
      energyLevel: PetEnergyLevelOptions[energyLevel as PetEnergyLevelOptions],
      levelOfIndependence:
        PetLevelOfIndependenceOptions[
          levelOfIndependence as PetEnergyLevelOptions
        ],
      typeOfEnvironment:
        PetTypeOfEnvironmentOptions[
          typeOfEnvironment as PetTypeOfEnvironmentOptions
        ],
      orgId: new UniqueIdentity(orgId),
    });

    await this.petRepository.create(pet);
    return { pet };
  }
}

export default CreatePetUseCase;
