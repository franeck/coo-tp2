import {Order, Package, Contact, Carrier} from "../model/Order"

export class OrderBuilder {

    private id: number;
    private createdAt: Date;
    private packages: Package[];
    private contact: Contact;
    private carrier: Carrier;

    constructor() {}

    public setId(id: number): OrderBuilder {
        this.id = id;
        return this;
      }
    
      public setCreatedAt(createdAt: Date): OrderBuilder {
        this.createdAt = createdAt;
        return this;
      }
    
      public setPackages(packages: Package[]): OrderBuilder {
        this.packages = packages;
        return this;
      }
    
      public setContact(contact: Contact): OrderBuilder {
        this.contact = contact;
        return this;
      }
    
      public setFakeContact(): OrderBuilder {
        this.contact = {
          firstname: 'Jhon',
          lastname: 'Smith',
          phone: '0600000000',
          mail: 'jhon.smith@example.com',
          billingAddress: {
            postalCode: '00000',
            city: 'Paris',
            addressLine1: '0 Rue Nationale',
            addressLine2: '',
          },
          deliveryAddress: {
            postalCode: '00000',
            city: 'Paris',
            addressLine1: '0 Rue Nationale',
            addressLine2: '',
          },
        };
        return this;
      }
    
      public setCarrier(carrier: Carrier): OrderBuilder {
        this.carrier = carrier;
        return this;
      }
    
      public build(): Order {
        return new Order(this);
      }

      public getId(): number {
        return this.id;
      }
      public getCreatedAt(): Date {
        return this.createdAt;
      }
      public getPackages(): Package[] {
        return this.packages;
      }
      public getContact(): Contact {
        return this.contact;
      }
      public getCarrier(): Carrier {
        return this.carrier;
      }
}