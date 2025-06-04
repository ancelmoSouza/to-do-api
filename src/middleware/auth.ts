import { FastifyRequest, FastifyReply } from "fastify";

export async function auth(request: FastifyRequest, reply: FastifyReply) {
    const token = request.cookies;

    if (!token) {
        return reply.status(401).send({ message: "Authentication required" });
    }

    try {
        await request.jwtVerify();
    } catch (error) {
        reply.code(401).send({ message: "Invalid Token", error });
    }
}
