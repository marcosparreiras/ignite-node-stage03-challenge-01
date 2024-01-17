import Org from "../../enterprise/entity/org";
import Address from "../../enterprise/entity/value-objects/address";
import EmailAlreadyInUseError from "../errors/email-alreay-in-use-error";
import OrgRepository from "../repositories/org-repository";
import { hashPassword } from "../utils/password-utils";

interface CreateOrgUseCaseRequest {
  name: string;
  email: string;
  password: string;
  whatsapp: string;
  address: {
    city: string;
    state: string;
    street: string;
    number: number;
  };
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

class CreateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name,
    email,
    password,
    whatsapp,
    address,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const isEmailAlreadyInUse = await this.orgRepository.findByEmail(email);
    if (isEmailAlreadyInUse) {
      throw new EmailAlreadyInUseError();
    }

    const addressObject = new Address({
      city: address.city,
      state: address.state,
      number: address.number,
      street: address.street,
    });
    const passowrdHashed = await hashPassword(password);
    const org = Org.create({
      name,
      email,
      whatsapp,
      password: passowrdHashed,
      address: addressObject,
    });

    await this.orgRepository.create(org);
    return { org };
  }
}

export default CreateOrgUseCase;
