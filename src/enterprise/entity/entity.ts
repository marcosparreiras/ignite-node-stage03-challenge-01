import UniqueIdentity from "./value-objects/unique-identity";

abstract class Entity<Props> {
  private _id: UniqueIdentity;
  protected props: Props;

  get id() {
    return this._id;
  }

  protected constructor(props: Props, id?: UniqueIdentity) {
    this.props = props;
    this._id = id ?? new UniqueIdentity();
  }
}

export default Entity;
