import * as z from "zod";

export const UserValidation = z.object({
  image: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(20, {
      message: "Name can't be longer than 20 characters",
    }),

  username: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(12, {
      message: "Username can't be longer than 12 characters",
    }),
  bio: z
    .string()
    .min(3, {
      message: "Bio must be at least 3 characters",
    })
    .max(280, {
      message: "Bio can't be longer than 280 characters",
    }),
});
