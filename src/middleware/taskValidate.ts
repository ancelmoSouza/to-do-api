import { AnySchema } from "yup";
import { FastifyRequest, FastifyReply } from "fastify";

export const taskValidate =
    (schema: AnySchema) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const data = await schema.validate(request.body, {
                abortEarly: false,
                stripUnknown: true,
            });
            request.body = data;
        } catch (err: any) {
            return reply.status(400).send({
                message: "Erro de validação",
                errors: err.errors,
            });
        }
    };
