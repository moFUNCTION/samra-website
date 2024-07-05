import { z } from "zod";
export const schema = z.object({
  phoneNumber: z.number({
    required_error: "الرجاء ادخال رقم الهاتف",
    invalid_type_error: "الرجاء ادخال رقم الهاتف",
  }),
});
