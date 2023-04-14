import { ZodError } from "zod";

export function ZodErrorFormatter(err: ZodError) {
  const error = err.issues.map((issue) => ({
    path: issue.path[0],
    message: issue.message,
  }));

  return error;
}
