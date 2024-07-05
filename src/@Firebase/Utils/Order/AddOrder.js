import { addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/Config";
import { getFirebaseErrorMessageInArabic } from "../../lib/ErrorTranslatorToArabic/ErrorTranslatorToArabic";

export class AddOrder {
  constructor({
    location,
    phoneNumber,
    userID,
    discountCode,
    providedText,
    order,
    totalPrice,
  }) {
    this.location = location;
    this.phoneNumber = phoneNumber;
    this.userID = userID;
    this.discountCode = discountCode;
    this.providedText = providedText;
    this.order = order;
    this.totalPrice = totalPrice;
  }
  async CheckIfDiscountExist() {
    if (this.discountCode) {
      const discountCode = doc(db, "Discounts", this.discountCode);
      const discountCodeRes = await getDoc(discountCode);
      return discountCodeRes.exists() && !discountCodeRes.data().isUsed;
    } else {
      return false;
    }
  }
  async #AddOrderToFireStore() {
    const isDiscountExist = await this.CheckIfDiscountExist();
    await addDoc(db, {
      status: "pending",
      order: this.order,
      userId: this.userID,
      location: this.location,
      [this.phoneNumber && "phoneNumber"]: this.phoneNumber,
      [this.discountCode && "discountCode"]: this.discountCode,
      [this.providedText && "providedText"]: this.providedText,
      [this.discountCode && isDiscountExist && "discountCode"]:
        this.discountCode,
      totalPrice: this.totalPrice,
    });
  }
  async AddRequest() {
    try {
      const req = await this.#AddOrderToFireStore();
      return req;
    } catch (err) {
      console.log(err);
      throw new Error(getFirebaseErrorMessageInArabic(err.code));
    }
  }
}
