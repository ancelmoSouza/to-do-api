import * as yup from "yup";

const validStatus = ["pending", "completed"] as const;

export const taskQuerySchema = yup.object({
    status: yup
        .string()
        .oneOf(validStatus, "Status deve ser um entre pendente ou completo")
        .optional(),
});

export type TaskQuery = yup.InferType<typeof taskQuerySchema>;
