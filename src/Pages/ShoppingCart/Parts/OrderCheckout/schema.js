import { z } from "zod";

export const schema = z
  .object({
    isDiscountExist: z.boolean(),
    locationType: z.enum(["currentLocation", "customLocation"]),
    location: z.any(),
    phoneType: z.enum(["accountPhoneNumber", "customPhoneNumber"]),
    phoneNumber: z.any(),
    discountCode: z.any(),
    providedText: z.any(),
  })
  .superRefine((value, ctx) => {
    const { locationType, location, phoneType, phoneNumber } = value;
    if (locationType === "customLocation") {
      if (typeof location !== "string" || !location) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: "الرجاء ادخال الموقع يدويا بما انك اخترت ادخال موقع مخصص",
          path: ["location"],
        });
      }
    }
    if (phoneType === "customPhoneNumber") {
      if (typeof phoneNumber !== "number" || !phoneNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: "الرجاء ادخال رقم الهاتف للتواصل",
          path: ["phoneNumber"],
        });
      }
    }
  });
