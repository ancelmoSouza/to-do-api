import * as yup from "yup";

export const taskIdSchema = yup.object({
    id: yup
        .number()
        .typeError("ID deve ser um número")
        .required("ID é obrigatório")
        .integer("ID deve ser inteiro")
        .positive("ID deve ser positivo"),
});

export type TaskIdParams = yup.InferType<typeof taskIdSchema>;
