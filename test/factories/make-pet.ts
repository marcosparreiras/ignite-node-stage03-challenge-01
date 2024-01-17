import Pet, {
  PetAgeOptions,
  PetEnergyLevelOptions,
  PetLevelOfIndependenceOptions,
  PetProps,
  PetSizeOption,
  PetTypeOfEnvironmentOptions,
} from "../../src/enterprise/entity/pet";
import UniqueIdentity from "../../src/enterprise/entity/value-objects/unique-identity";

function makePet(overide: Partial<PetProps> = {}, id?: UniqueIdentity) {
  return Pet.create(
    {
      age: PetAgeOptions.puppy,
      description: "fake description",
      energyLevel: PetEnergyLevelOptions.high,
      levelOfIndependence: PetLevelOfIndependenceOptions.medium,
      name: "fake pet",
      orgId: new UniqueIdentity(),
      size: PetSizeOption.medium,
      typeOfEnvironment: PetTypeOfEnvironmentOptions.high,
      ...overide,
    },
    id
  );
}

export default makePet;
