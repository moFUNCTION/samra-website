import { AddOrder } from "./AddOrder";

export class Order {
  constructor({
    location,
    phoneNumber,
    discountCode,
    providedText,
    order,
    totalPrice,
  }) {
    this.location = location;
    this.phoneNumber = phoneNumber;
    this.discountCode = discountCode;
    this.providedText = providedText;
    this.order = order;
    this.totalPrice = totalPrice;
  }
  #getValues() {
    return {
      location: this.location,
      phoneNumber: this.phoneNumber,
      userId: this.userID,
      discountCode: this.discountCode,
      providedText: this.providedText,
      order: this.order,
      totalPrice: this.totalPrice,
    };
  }
  async Add({ userID }) {
    const add_init = new AddOrder({ ...this.#getValues(), userID });
    const req = await add_init.AddRequest();
  }
  async Update() {}
  async Delete() {}
  async Get() {}
}
