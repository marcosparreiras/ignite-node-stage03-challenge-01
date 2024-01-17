import makeOrg from "../../../test/factories/make-org";
import InMemoryOrgRepository from "../../../test/repositories/in-memory-org-repository";
import InvalidCredentialsError from "../errors/invalid-credentials-error";
import { hashPassword } from "../utils/password-utils";
import AuthenticateOrgUseCase from "./authenticate-org";

let inMemoryOrgRepsitory: InMemoryOrgRepository;
let sut: AuthenticateOrgUseCase;

describe("AuthenticateOrgUseCase", () => {
  beforeEach(() => {
    inMemoryOrgRepsitory = new InMemoryOrgRepository();
    sut = new AuthenticateOrgUseCase(inMemoryOrgRepsitory);
  });

  it("Should be able to authenticate a org", async () => {
    const newOrg = makeOrg({
      email: "fake@org.com",
      password: await hashPassword("123456"),
    });
    await inMemoryOrgRepsitory.create(newOrg);

    const { org } = await sut.execute({
      email: "fake@org.com",
      password: "123456",
    });
    expect(org).toEqual(newOrg);
  });

  it("Should not be able to authenticate a org with a wrong password", async () => {
    const newOrg = makeOrg({
      email: "fake@org.com",
      password: await hashPassword("123456"),
    });
    await inMemoryOrgRepsitory.create(newOrg);

    await expect(() =>
      sut.execute({
        email: "fake@org.com",
        password: "654312",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to authenticate a org with a wrong email", async () => {
    const newOrg = makeOrg({
      email: "fake@org.com",
      password: await hashPassword("123456"),
    });
    await inMemoryOrgRepsitory.create(newOrg);

    await expect(() =>
      sut.execute({
        email: "fake132@org.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
