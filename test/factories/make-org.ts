import Org, { OrgProps } from "../../src/enterprise/entity/org";
import Address from "../../src/enterprise/entity/value-objects/address";
import UniqueIdentity from "../../src/enterprise/entity/value-objects/unique-identity";

function makeOrg(overide: Partial<OrgProps> = {}, id?: UniqueIdentity) {
  return Org.create(
    {
      name: "Fake Name",
      email: "fake@test.com",
      address: new Address({
        city: "Fake City",
        number: 1001,
        state: "Fake State",
        street: "Fake street",
      }),
      password: "123456",
      whatsapp: "31996575047",
      ...overide,
    },
    id
  );
}

export default makeOrg;
