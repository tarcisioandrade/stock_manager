import zod, { z } from "zod";

export function Validator(body: any, schema: zod.ZodSchema): boolean {
  const validate = schema.parse(body);
  if (validate) {
    return true;
  } else {
    return validate;
  }
}
