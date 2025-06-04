import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../../services/User/UserService";
import { verifyPassword } from "../../util/hash";
import { isUser } from "../../util/isUser";
import { error } from "console";

class UserController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password } = request.body as {
            name: string;
            email: string;
            password: string;
        };

        const userService = new UserService();

        const user = await userService.create({ name, email, password });

        reply.status(200).send(user);
    }

    async login(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { email, password } = request.body as {
                email: string;
                password: string;
            };

            const userservice = new UserService();

            const userRes = await userservice.login({ email, password });

            if (isUser(userRes)) {
                const isMatch =
                    userRes &&
                    verifyPassword({
                        candidatePassword: password,
                        salt: userRes.salt,
                        hash: userRes.password,
                    });

                if (!userRes || !isMatch) {
                    return reply.code(401).send({
                        message: "Invalid Email or Password",
                    });
                }

                const payload = {
                    id: userRes.id,
                    email: userRes.email,
                    name: userRes.name,
                };

                const tokenJWT = await reply.jwtSign({ payload });

                reply.setCookie("access_token", tokenJWT, {
                    path: "/",
                    httpOnly: true,
                    secure: false,
                });

                reply
                    .status(200)
                    .send({
                        success: true,
                        message: "Login successful",
                        token: tokenJWT,
                    });
            } else if (userRes?.success === false) {
                reply.status(401).send(error);
            }
        } catch (error) {
            reply.send({ success: false, error });
        }
    }
}

export { UserController };
