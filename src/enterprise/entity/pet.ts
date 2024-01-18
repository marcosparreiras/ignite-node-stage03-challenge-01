import Optional from "../../types/Optional";
import Entity from "./entity";
import UniqueIdentity from "./value-objects/unique-identity";

export enum PetAgeOptions {
  puppy = "puppy",
  juvenile = "juvenile",
  adult = "adult",
  senior = "senior",
}
export enum PetSizeOption {
  small = "small",
  medium = "medium",
  big = "big",
}
export enum PetEnergyLevelOptions {
  low = "low",
  medium = "medium",
  high = "high",
}
export enum PetLevelOfIndependenceOptions {
  low = "low",
  medium = "medium",
  high = "high",
}
export enum PetTypeOfEnvironmentOptions {
  closed = "closed",
  open = "open",
}

export interface PetProps {
  name: string;
  description: string;
  age: PetAgeOptions;
  size: PetSizeOption;
  energyLevel: PetEnergyLevelOptions;
  levelOfIndependence: PetLevelOfIndependenceOptions;
  typeOfEnvironment: PetTypeOfEnvironmentOptions;
  orgId: UniqueIdentity;
  createdAt: Date;
  updatedAt?: Date;
}

class Pet extends Entity<PetProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get age() {
    return this.props.age;
  }

  get size() {
    return this.props.size;
  }

  get energyLevel() {
    return this.props.energyLevel;
  }

  get levelOfIndependence() {
    return this.props.levelOfIndependence;
  }

  get typeOfEnvironment() {
    return this.props.typeOfEnvironment;
  }

  get orgId() {
    return this.props.orgId;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<PetProps, "createdAt">, id?: UniqueIdentity) {
    return new Pet(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }
}

export default Pet;
