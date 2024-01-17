import makeOrg from "../../../test/factories/make-org";
import makePet from "../../../test/factories/make-pet";
import InMemoryOrgRepository from "../../../test/repositories/in-memory-org-repository";
import InMemoryPetRepository from "../../../test/repositories/in-memory-pet-repository";
import { PetAgeOptions } from "../../enterprise/entity/pet";
import Address from "../../enterprise/entity/value-objects/address";
import FetchPetsByCityUseCase from "./fetch-pets-by-city";

let inMemoryPetRepository: InMemoryPetRepository;
let inMemoryOrgRepository: InMemoryOrgRepository;
let sut: FetchPetsByCityUseCase;

describe("FetchPetsByCityUseCase", () => {
  beforeEach(() => {
    inMemoryPetRepository = new InMemoryPetRepository();
    inMemoryOrgRepository = new InMemoryOrgRepository();
    sut = new FetchPetsByCityUseCase(
      inMemoryPetRepository,
      inMemoryOrgRepository
    );
  });

  it("Should be able to fetch pets by city", async () => {
    const org1 = makeOrg({
      address: new Address({
        city: "Belo Horizonte",
        state: "Minas Gerais",
        street: "Fake Street",
        number: 1001,
      }),
    });

    const org2 = makeOrg({
      address: new Address({
        city: "Belo Horizonte",
        state: "Minas Gerais",
        street: "Fake Street 1",
        number: 652,
      }),
    });

    const org3 = makeOrg({
      address: new Address({
        city: "Rio De Janeiro",
        state: "Rio De Janeiro",
        street: "Fake Street 2",
        number: 523,
      }),
    });

    await inMemoryOrgRepository.create(org1);
    await inMemoryOrgRepository.create(org2);
    await inMemoryOrgRepository.create(org3);

    const pet1 = makePet({ orgId: org1.id });
    const pet2 = makePet({ orgId: org1.id });
    const pet3 = makePet({ orgId: org2.id });
    const pet4 = makePet({ orgId: org3.id });
    const pet5 = makePet({ orgId: org3.id });

    await inMemoryPetRepository.create(pet1);
    await inMemoryPetRepository.create(pet2);
    await inMemoryPetRepository.create(pet3);
    await inMemoryPetRepository.create(pet4);
    await inMemoryPetRepository.create(pet5);

    const { pets } = await sut.execute({ city: org1.address.city });
    expect(pets).toHaveLength(3);
  });

  it("Should be able to filter results", async () => {
    const newOrg = makeOrg({
      address: new Address({
        city: "Belo Horizonte",
        state: "Minas Gerais",
        street: "Fake Street",
        number: 1001,
      }),
    });

    await inMemoryOrgRepository.create(newOrg);

    const pet1 = makePet({ orgId: newOrg.id, age: PetAgeOptions.juvenile });
    const pet2 = makePet({ orgId: newOrg.id, age: PetAgeOptions.juvenile });
    const pet3 = makePet({ orgId: newOrg.id, age: PetAgeOptions.adult });
    const pet4 = makePet({ orgId: newOrg.id, age: PetAgeOptions.puppy });

    await inMemoryPetRepository.create(pet1);
    await inMemoryPetRepository.create(pet2);
    await inMemoryPetRepository.create(pet3);
    await inMemoryPetRepository.create(pet4);

    const { pets } = await sut.execute({
      city: newOrg.address.city,
      filters: { age: PetAgeOptions.juvenile },
    });

    expect(pets).toHaveLength(2);
    expect(pets[0].age).toEqual(PetAgeOptions.juvenile);
  });
});
