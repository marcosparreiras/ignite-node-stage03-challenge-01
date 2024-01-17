interface AddressProps {
  state: string;
  city: string;
  street: string;
  number: number;
}

class Address {
  private _state: string;
  private _city: string;
  private _street: string;
  private _number: number;

  get state() {
    return this._state;
  }

  get city() {
    return this._city;
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get fullAdrress() {
    return `${this._street}, ${this._number}, ${this._city}, ${this._state}`;
  }

  set state(value: string) {
    this._state = value;
  }

  set city(value: string) {
    this._city = value;
  }

  set street(value: string) {
    this._street = value;
  }

  set number(value: number) {
    this._number = value;
  }

  constructor(props: AddressProps) {
    this._state = props.state;
    this._city = props.city;
    this._street = props.street;
    this._number = props.number;
  }
}

export default Address;
