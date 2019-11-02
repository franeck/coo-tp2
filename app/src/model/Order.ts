import { IOrder } from "../interface/order.interface"

class Order implements IOrder{
    id: number;
    createdAt: Date;
    packages: Package[];
    contact: Contact;
    carrier: Carrier;
  }
  class Package {
    length: Size;
    width: Size;
    height: Size;
    weight: Size;
    products: Product[]
  }
  class Size {
    unit: string;
    value: number;
  }
  class Product {
    quantity: number;
    label: string;
    ean: string;
  }
  class Contact {
    firstname: string;
    lastname: string;
    phone: string;
    mail: string;
    billingAddress: Address;
    deliveryAddress: Address;
  }
  class Address {
    postalCode: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
  }
  class Carrier {
    name: string;
    contact: CarrierContact;
  }
  class CarrierContact {
    firstname: string;
    lastname: string;
    phone: string;
    mail: string;
    headOfficeAddress: Address;
  }
  