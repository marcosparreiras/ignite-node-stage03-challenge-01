import PetRepository from "../../src/application/repositories/pet-repository";
import Pet, { PetProps } from "../../src/enterprise/entity/pet";

class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = [];

  async findById(petId: string) {
    const pet = this.items.find((item) => item.id.toString() === petId);
    return pet ?? null;
  }

  async create(pet: Pet) {
    this.items.push(pet);
  }

  async fetchManyByOrgId(orgId: string, filters?: Partial<PetProps>) {
    let pets: Pet[];
    pets = this.items.filter((item) => item.orgId.toString() === orgId);
    if (filters) {
      for (let filter in filters) {
        pets = pets.filter(
          (item) =>
            item[filter as keyof Pet] === filters[filter as keyof PetProps]
        );
      }
    }
    return pets;
  }
}

export default InMemoryPetRepository;
