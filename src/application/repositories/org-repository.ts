import Org from "../../enterprise/entity/org";

interface OrgRepository {
  fetchManyByCity(city: string): Promise<Org[]>;
  findById(orgId: string): Promise<null | Org>;
  findByEmail(email: string): Promise<null | Org>;
  create(org: Org): Promise<void>;
}

export default OrgRepository;
