import Pet, { PetProps } from "../../enterprise/entity/pet";

interface PetRepository {
  create(pet: Pet): Promise<void>;
  fetchManyByOrgId(orgId: string, filters?: Partial<PetProps>): Promise<Pet[]>;
  findById(petId: string): Promise<null | Pet>;
}

export default PetRepository;
