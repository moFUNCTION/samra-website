import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../Config/Config";
import { getFirebaseErrorMessageInArabic } from "../../lib/ErrorTranslatorToArabic/ErrorTranslatorToArabic";

export class AddOrder {
  #collection = "Orders";
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
    let Data = {
      status: "pending",
      order: this.order,
      userId: this.userID,
      location: this.location,
      totalPrice: this.totalPrice,
      createdAt: serverTimestamp(),
    };
    if (this.phoneNumber) {
      Data.phoneNumber = this.phoneNumber;
    }
    if (this.providedText) {
      Data.providedText = this.providedText;
    }
    if (this.discountCode && isDiscountExist) {
      Data.discountCode = this.discountCode;
    }
    const ordersRef = collection(db, this.#collection);
    await addDoc(ordersRef, Data);
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
