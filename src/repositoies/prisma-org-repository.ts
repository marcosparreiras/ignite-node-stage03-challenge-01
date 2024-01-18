import OrgRepository from "../application/repositories/org-repository";
import Org from "../enterprise/entity/org";
import Address from "../enterprise/entity/value-objects/address";
import UniqueIdentity from "../enterprise/entity/value-objects/unique-identity";
import prisma from "./lib/prisma";
import { Org as PrismaOrg } from "@prisma/client";

class PrismaOrgRepository implements OrgRepository {
  private createOrgFromPrismaItem(item: PrismaOrg): Org {
    return Org.create(
      {
        name: item.name,
        email: item.email,
        password: item.password,
        whatsapp: item.whatsapp,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        address: new Address({
          state: item.state,
          city: item.city,
          street: item.city,
          number: item.number,
        }),
      },
      new UniqueIdentity(item.id)
    );
  }

  async create(org: Org): Promise<void> {
    await prisma.org.create({
      data: {
        id: org.id.toString(),
        name: org.name,
        email: org.email,
        password: org.password,
        whatsapp: org.whatsapp,
        state: org.address.state,
        city: org.address.city,
        street: org.address.street,
        number: org.address.number,
      },
    });
  }

  async fetchManyByCity(city: string): Promise<Org[]> {
    const items = await prisma.org.findMany({ where: { city } });
    const orgs = items.map((item) => this.createOrgFromPrismaItem(item));
    return orgs;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const item = await prisma.org.findUnique({ where: { email } });
    if (!item) {
      return null;
    }
    const org = this.createOrgFromPrismaItem(item);
    return org;
  }

  async findById(orgId: string): Promise<Org | null> {
    const item = await prisma.org.findUnique({ where: { id: orgId } });
    if (!item) {
      return null;
    }
    const org = this.createOrgFromPrismaItem(item);
    return org;
  }
}

export default PrismaOrgRepository;
