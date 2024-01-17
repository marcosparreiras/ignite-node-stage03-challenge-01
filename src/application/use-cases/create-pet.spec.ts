import makeOrg from "../../../test/factories/make-org";
import InMemoryOrgRepository from "../../../test/repositories/in-memory-org-repository";
import InMemoryPetRepository from "../../../test/repositories/in-memory-pet-repository";
import Pet, {
  PetAgeOptions,
  PetEnergyLevelOptions,
  PetLevelOfIndependenceOptions,
  PetSizeOption,
  PetTypeOfEnvironmentOptions,
} from "../../enterprise/entity/pet";
import InvalidParameterError from "../errors/invalid-parameter-error";
import ResourceNotFoundError from "../errors/resource-not-found-error";
import CreatePetUseCase from "./create-pet";

let inMemoryPetRepository: InMemoryPetRepository;
let inMemoryOrgRepository: InMemoryOrgRepository;
let sut: CreatePetUseCase;

describe("CreatePetUseCase", () => {
  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository();
    inMemoryOrgRepository = new InMemoryOrgRepository();
    sut = new CreatePetUseCase(inMemoryPetRepository, inMemoryOrgRepository);
  });

  it("Should be able to create a pet", async () => {
    const newOrg = makeOrg();
    await inMemoryOrgRepository.create(newOrg);

    const { pet } = await sut.execute({
      name: "Fake Pet",
      description: "Fake description",
      orgId: newOrg.id.toString(),
      age: PetAgeOptions.adult,
      energyLevel: PetEnergyLevelOptions.high,
      levelOfIndependence: PetLevelOfIndependenceOptions.high,
      size: PetSizeOption.medium,
      typeOfEnvironment: PetTypeOfEnvironmentOptions.high,
    });

    expect(pet.orgId).toEqual(newOrg.id);
    expect(pet.id).toBeTruthy();
    expect(pet.name).toEqual("Fake Pet");
  });

  it("Should not be possible to create a pet with a unexistent orgId", async () => {
    await expect(() =>
      sut.execute({
        name: "Fake Pet",
        description: "Fake Description",
        orgId: "Fake Org Id",
        age: PetAgeOptions.adult,
        energyLevel: PetEnergyLevelOptions.high,
        levelOfIndependence: PetLevelOfIndependenceOptions.high,
        size: PetSizeOption.medium,
        typeOfEnvironment: PetTypeOfEnvironmentOptions.high,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("Should not be possible to create a pet with a wrong parameter", async () => {
    const newOrg = makeOrg();
    await inMemoryOrgRepository.create(newOrg);

    await expect(() =>
      sut.execute({
        name: "Fake Pet",
        description: "Fake Description",
        orgId: newOrg.id.toString(),
        age: "unexistentAge",
        energyLevel: PetEnergyLevelOptions.high,
        levelOfIndependence: PetLevelOfIndependenceOptions.high,
        size: PetSizeOption.medium,
        typeOfEnvironment: PetTypeOfEnvironmentOptions.high,
      })
    ).rejects.toBeInstanceOf(InvalidParameterError);
  });
});
