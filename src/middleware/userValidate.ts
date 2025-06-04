import { AnySchema } from "yup";
import { FastifyRequest, FastifyReply } from "fastify";

export const userValidate =
    (schema: AnySchema) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const data = await schema.validate(request.body, {
                abortEarly: false,
            });
            request.body = data;
        } catch (error: any) {
            return reply.status(422).send({
                message: "Erro de validação",
                errors: error.errors,
            });
        }
    };
