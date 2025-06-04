import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import dotenv from "dotenv";

import { routes } from "../routes/routes";
import { auth } from "../middleware/auth";

dotenv.config();

const app: FastifyInstance = fastify({
    logger: true,
});

app.register(jwt, {
    secret: process.env.SECRET || "secret-access",
    cookie: {
        cookieName: "access_token",
        signed: false,
    },
});

app.register(cookie, {
    secret: process.env.SECRET,
    parseOptions: {},
} as FastifyCookieOptions);

app.decorate("authenticate", auth);

app.register(cors);
app.register(routes);

export { app };
