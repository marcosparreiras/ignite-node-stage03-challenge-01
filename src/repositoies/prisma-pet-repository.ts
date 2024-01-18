import PetRepository from "../application/repositories/pet-repository";
import Pet, {
  PetAgeOptions,
  PetEnergyLevelOptions,
  PetLevelOfIndependenceOptions,
  PetProps,
  PetSizeOption,
  PetTypeOfEnvironmentOptions,
} from "../enterprise/entity/pet";
import UniqueIdentity from "../enterprise/entity/value-objects/unique-identity";
import prisma from "./lib/prisma";
import { Pet as PrismaPet } from "@prisma/client";

class PrismaPetRepository implements PetRepository {
  private createPetByPrismaItem(item: PrismaPet): Pet {
    return Pet.create(
      {
        name: item.name,
        description: item.description,
        orgId: new UniqueIdentity(item.org_id),
        age: PetAgeOptions[item.age as PetAgeOptions],
        levelOfIndependence:
          PetLevelOfIndependenceOptions[
            item.LevelOfIndependence as PetLevelOfIndependenceOptions
          ],
        energyLevel:
          PetEnergyLevelOptions[item.energyLevel as PetEnergyLevelOptions],
        size: PetSizeOption[item.size as PetSizeOption],
        typeOfEnvironment:
          PetTypeOfEnvironmentOptions[
            item.typeOfEnvironment as PetTypeOfEnvironmentOptions
          ],
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      },
      new UniqueIdentity(item.id)
    );
  }

  async create(pet: Pet): Promise<void> {
    await prisma.pet.create({
      data: {
        id: pet.id.toString(),
        age: pet.age,
        description: pet.description,
        energyLevel: pet.energyLevel,
        LevelOfIndependence: pet.levelOfIndependence,
        name: pet.name,
        size: pet.size,
        typeOfEnvironment: pet.typeOfEnvironment,
        org_id: pet.orgId.toString(),
      },
    });
  }

  async fetchManyByOrgId(
    orgId: string,
    filters?: Partial<PetProps>
  ): Promise<Pet[]> {
    const items = await prisma.pet.findMany({
      where: { org_id: orgId, ...filters },
    });
    const pets = items.map((item) => this.createPetByPrismaItem(item));
    return pets;
  }

  async findById(petId: string): Promise<Pet | null> {
    const item = await prisma.pet.findUnique({ where: { id: petId } });
    if (!item) {
      return null;
    }
    const pet = this.createPetByPrismaItem(item);
    return pet;
  }
}

export default PrismaPetRepository;
