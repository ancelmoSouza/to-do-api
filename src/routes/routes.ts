import { FastifyInstance, FastifyRequest } from "fastify";
import { UserController } from "../controllers/user/UserController";
import { TaskController } from "../controllers/task/TaskController";
import { TaskIdParams } from "../types";
import { TaskAttributes } from "../models/TaskModel";
import { userValidate } from "../middleware/userValidate";
import { userSchema } from "../schemas/userSchema";
import { loginValidate } from "../middleware/loginValidate";
import { loginSchema } from "../schemas/loginSchema";
import { taskSchema } from "../schemas/taskSchema";
import { taskValidateParams } from "../middleware/taskValidateParams";
import { taskIdSchema } from "../schemas/taskIdSchema";
import { taskValidate } from "../middleware/taskValidate";
import { taskValidateQuery } from "../middleware/taskValidateQuery";
import { taskQuerySchema } from "../schemas/taskQuerySchema";
import { updateTaskValidate } from "../middleware/updateTaskValidate";
import { updateTaskSchema } from "../schemas/updateTaskSchema";

interface GetTasksQuery {
    Querystring: {
        status?: "pending" | "completed";
    };
}
export async function routes(fastify: FastifyInstance) {
    fastify.post("/auth/login", {
        preHandler: loginValidate(loginSchema),
        handler: async (request: FastifyRequest, reply) => {
            return new UserController().login(request, reply);
        },
    });

    fastify.post("/auth/register", {
        preHandler: userValidate(userSchema),
        handler: async (request: FastifyRequest, reply) => {
            return new UserController().create(request, reply);
        },
    });

    fastify.post(
        "/tasks",
        { preHandler: [fastify.authenticate, taskValidate(taskSchema)] },
        async (request: FastifyRequest, reply) => {
            return new TaskController().create(request, reply);
        }
    );

    fastify.get<GetTasksQuery>(
        "/tasks",
        {
            preHandler: [
                fastify.authenticate,
                taskValidateQuery(taskQuerySchema),
            ],
        },
        async (request, reply) => {
            return new TaskController().get(request, reply);
        }
    );

    fastify.get<{ Params: TaskIdParams }>(
        "/tasks/:id",
        {
            preHandler: [
                fastify.authenticate,
                taskValidateParams(taskIdSchema),
            ],
        },
        async (request, reply) => {
            return new TaskController().getById(request, reply);
        }
    );

    fastify.delete<{ Params: TaskIdParams }>(
        "/tasks/:id",
        {
            preHandler: [
                fastify.authenticate,
                taskValidateParams(taskIdSchema),
            ],
        },
        async (request, reply) => {
            return new TaskController().delete(request, reply);
        }
    );

    fastify.put<{
        Params: { id: string };
        Body: Partial<Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">>;
    }>(
        "/tasks/:id",
        {
            preHandler: [
                fastify.authenticate,
                taskValidateParams(taskIdSchema),
                updateTaskValidate(updateTaskSchema),
            ],
        },
        async (request, reply) => {
            return new TaskController().update(request, reply);
        }
    );

    fastify.put<{ Params: { id: number } }>(
        "/tasks/complete/:id",
        {
            preHandler: [
                fastify.authenticate,
                taskValidateParams(taskIdSchema),
            ],
        },
        async (request, reply) => {
            return new TaskController().setCompleted(request, reply);
        }
    );
}
