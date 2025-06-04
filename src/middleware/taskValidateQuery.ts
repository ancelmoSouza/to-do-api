import { AnySchema } from "yup";
import { FastifyRequest, FastifyReply } from "fastify";

export const taskValidateQuery =
    (schema: AnySchema) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const data = await schema.validate(request.query, {
                abortEarly: false,
                stripUnknown: true,
            });
            request.query = data;
        } catch (err: any) {
            return reply.status(400).send({
                message: "Erro de validação na query string",
                errors: err.errors,
            });
        }
    };
