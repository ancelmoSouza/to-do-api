import * as yup from "yup";

const validStatus = ["pending", "completed"] as const;

export const taskSchema = yup.object({
    title: yup.string().required("O título é obrigatório"),
    description: yup.string().optional(),
    status: yup
        .string()
        .oneOf(
            validStatus,
            `Status deve ser um dos seguintes: ${validStatus.join(", ")}`
        )
        .required("Status é obrigatório"),
    dueDate: yup
        .date()
        .typeError("dueDate deve ser uma data válida")
        .optional()
        .nullable(),
    userId: yup.number().required("userId é obrigatório").integer().positive(),
});

export type TaskInput = yup.InferType<typeof taskSchema>;
