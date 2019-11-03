import { IOrder } from "../interface/order.interface"
import { OrderBuilder } from "../builder/order.builder";

export class Order implements IOrder{
    id: number;
    createdAt: Date;
    packages: Package[];
    contact: Contact;
    carrier: Carrier;
    constructor(oredrBuilder: OrderBuilder) {
      this.id = oredrBuilder.getId();
      this.createdAt = oredrBuilder.getCreatedAt();
      this.packages = oredrBuilder.getPackages();
      this.contact = oredrBuilder.getContact();
      this.carrier = oredrBuilder.getCarrier();
    }
  }
  export class Package {
    length: Size;
    width: Size;
    height: Size;
    weight: Size;
    products: Product[]
  }
  export class Size {
    unit: string;
    value: number;
  }
  export class Product {
    quantity: number;
    label: string;
    ean: string;
  }
  export class Contact {
    firstname: string;
    lastname: string;
    phone: string;
    mail: string;
    billingAddress: Address;
    deliveryAddress: Address;
  }
  export class Address {
    postalCode: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
  }
  export class Carrier {
    name: string;
    contact: CarrierContact;
  }
  export class CarrierContact {
    firstname: string;
    lastname: string;
    phone: string;
    mail: string;
    headOfficeAddress: Address;
  }