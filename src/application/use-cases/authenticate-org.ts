import Org from "../../enterprise/entity/org";
import InvalidCredentialsError from "../errors/invalid-credentials-error";
import OrgRepository from "../repositories/org-repository";
import { valdiatePassword } from "../utils/password-utils";

interface AuthenticateOrgUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateOrgUseCaseResponse {
  org: Org;
}

class AuthenticateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgRepository.findByEmail(email);
    if (!org) {
      throw new InvalidCredentialsError();
    }
    const passwordIsValid = await valdiatePassword(password, org.password);
    if (!passwordIsValid) {
      throw new InvalidCredentialsError();
    }
    return { org };
  }
}

export default AuthenticateOrgUseCase;
