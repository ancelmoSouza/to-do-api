import { AnySchema } from "yup";
import { FastifyRequest, FastifyReply } from "fastify";

export const taskValidateParams =
    (schema: AnySchema) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const data = await schema.validate(request.params, {
                abortEarly: false,
                stripUnknown: true,
            });
            request.params = data;
        } catch (err: any) {
            return reply.status(400).send({
                message: "Erro de validação nos parâmetros",
                errors: err.errors,
            });
        }
    };
