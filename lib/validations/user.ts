import * as z from "zod";

export const UserValidation = z.object({
  image: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(20, {
      message: "Name can't exceeds 20 characters",
    }),

  username: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(12, {
      message: "Username can't exceeds 12 characters",
    }),
  bio: z
    .string()
    .min(3, {
      message: "Bio must be at least 3 characters",
    })
    .max(280, {
      message: "Bio can't exceeds 280 characters",
    }),
});

export const SignUpValidation = z.object({
  email: z.string().email({ message: "Enter valid Email" }),

  password: z.string().min(6, {
    message: "Your password must contains at least 6 characters",
  }),
});


export const SignInValidation = z.object({
  email: z.string().email({ message: "Enter valid Email" }),

  password: z.string().min(6, {
    message: "Your password must be at least 6 characters",
  }),
});
