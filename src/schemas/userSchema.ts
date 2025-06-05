import * as yup from "yup";

export const userSchema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().min(6),
});

export type UserInput = yup.InferType<typeof userSchema>;
