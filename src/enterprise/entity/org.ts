import Optional from "../../types/Optional";
import Entity from "./entity";
import UniqueIdentity from "./value-objects/unique-identity";
import Address from "./value-objects/address";

export interface OrgProps {
  name: string;
  email: string;
  password: string;
  address: Address;
  whatsapp: string;
  createdAt: Date;
  updatedAt?: Date;
}

class Org extends Entity<OrgProps> {
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }
  get address() {
    return this.props.address;
  }
  get whatsapp() {
    return this.props.whatsapp;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<OrgProps, "createdAt">, id?: UniqueIdentity) {
    return new Org(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }
}

export default Org;
