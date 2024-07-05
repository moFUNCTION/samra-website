import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../Config/Config";

export const CheckDiscount = async () => {
  const discountCode = doc(db, "Discounts", this.discountCode);
  const discountCodeRes = await getDoc(discountCode);
  if (!discountCodeRes.exists()) {
    throw new Error("لا يوجد كوبون خصم بهئا الكود");
  }
  if (discountCodeRes.data().isUsed) {
    throw new Error("تم استخدام هذا الكوبون من قبل");
  }

  return `كوبون صحيح بخصم ${discountCodeRes.data().value} جنيه `;
};
