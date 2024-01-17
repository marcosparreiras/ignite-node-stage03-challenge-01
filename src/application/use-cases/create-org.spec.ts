import makeOrg from "../../../test/factories/make-org";
import InMemoryOrgRepository from "../../../test/repositories/in-memory-org-repository";
import EmailAlreadyInUseError from "../errors/email-alreay-in-use-error";
import { valdiatePassword } from "../utils/password-utils";
import CreateOrgUseCase from "./create-org";

let inMemoryOrgRepsitory: InMemoryOrgRepository;
let sut: CreateOrgUseCase;

describe("CreateOrgUseCase", () => {
  beforeEach(() => {
    inMemoryOrgRepsitory = new InMemoryOrgRepository();
    sut = new CreateOrgUseCase(inMemoryOrgRepsitory);
  });

  it("Should be able to create an org", async () => {
    const { org } = await sut.execute({
      name: "Fake Org",
      email: "fake@org.com",
      password: "123456",
      whatsapp: "99999999999",
      address: {
        city: "Fake City",
        number: 101,
        street: "Fake Street",
        state: "Fake State",
      },
    });

    expect(org.id).toBeTruthy();
  });

  it("Should be able to hash a org password on creation", async () => {
    const { org } = await sut.execute({
      name: "Fake Org",
      email: "fake@org.com",
      password: "123456",
      whatsapp: "99999999999",
      address: {
        city: "Fake City",
        number: 101,
        street: "Fake Street",
        state: "Fake State",
      },
    });

    const passwordIsHashed = await valdiatePassword("123456", org.password);
    expect(passwordIsHashed).toEqual(true);
  });

  it("Should not be able to create a org with a duplicate e-mail", async () => {
    const newOrg = makeOrg({ email: "fake@org.com" });
    await inMemoryOrgRepsitory.create(newOrg);

    await expect(() => {
      return sut.execute({
        name: "Fake Org",
        email: "fake@org.com",
        password: "123456",
        whatsapp: "99999999999",
        address: {
          city: "Fake City",
          number: 101,
          street: "Fake Street",
          state: "Fake State",
        },
      });
    }).rejects.toBeInstanceOf(EmailAlreadyInUseError);
  });
});
