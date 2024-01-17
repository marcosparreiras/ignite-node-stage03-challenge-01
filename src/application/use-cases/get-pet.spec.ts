import makePet from "../../../test/factories/make-pet";
import InMemoryPetRepository from "../../../test/repositories/in-memory-pet-repository";
import ResourceNotFoundError from "../errors/resource-not-found-error";
import GetPetUseCase from "./get-pet";

let inMemoryPetRepository: InMemoryPetRepository;
let sut: GetPetUseCase;

describe("GetPetUseCase", () => {
  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository();
    sut = new GetPetUseCase(inMemoryPetRepository);
  });

  it("Should be able to get a pet by id", async () => {
    const newPet = makePet();
    await inMemoryPetRepository.create(newPet);
    const { pet } = await sut.execute({ petId: newPet.id.toString() });
    expect(pet.id).toEqual(newPet.id);
  });

  it("Should not be able to get an unexistent pet", async () => {
    await expect(() => {
      return sut.execute({ petId: "pet-01" });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
