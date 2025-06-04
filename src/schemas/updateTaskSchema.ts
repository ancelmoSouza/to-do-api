import * as yup from "yup";

const validStatus = ["pending", "completed"] as const;

export const updateTaskSchema = yup.object({
    title: yup.string().optional(),
    description: yup.string().optional(),
    status: yup
        .string()
        .oneOf(
            validStatus,
            `Status deve ser um dos seguintes: ${validStatus.join(", ")}`
        )
        .optional(),
    dueDate: yup
        .date()
        .typeError("dueDate deve ser uma data válida")
        .nullable()
        .optional(),
    userId: yup.number().integer().positive().optional(),
});

export type UpdateTaskInput = yup.InferType<typeof updateTaskSchema>;
