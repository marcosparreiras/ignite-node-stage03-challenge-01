import { randomUUID } from "node:crypto";

class UniqueIdentity {
  private value: string;

  public toString() {
    return this.value;
  }

  public equals(id: UniqueIdentity) {
    return this.value.toString() === id.toString();
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }
}

export default UniqueIdentity;
