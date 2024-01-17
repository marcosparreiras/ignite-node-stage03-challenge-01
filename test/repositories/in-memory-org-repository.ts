import OrgRepository from "../../src/application/repositories/org-repository";
import Org from "../../src/enterprise/entity/org";

class InMemoryOrgRepository implements OrgRepository {
  public items: Org[] = [];

  async create(org: Org) {
    this.items.push(org);
  }

  async findById(orgId: string) {
    const org = this.items.find((item) => item.id.toString() === orgId);
    return org ?? null;
  }

  async fetchManyByCity(city: string) {
    const orgs = this.items.filter((item) => item.address.city === city);
    return orgs;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);
    return org ?? null;
  }
}

export default InMemoryOrgRepository;
