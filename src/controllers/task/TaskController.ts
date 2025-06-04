import { FastifyReply, FastifyRequest } from "fastify";
import { TaskService } from "../../services/Task/TaskService";
import { StatusType, TaskAttributes } from "../../models/TaskModel";
import { TaskIdParams } from "../../types";

interface GetByIdParams {
    id: number;
}

class TaskController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { title, description, status, dueDate, userId } =
            request.body as {
                title: string;
                description?: string;
                status: StatusType;
                dueDate?: Date | string;
                userId: number;
            };

        const taskService = new TaskService();

        const task = await taskService.create({
            title,
            description: description ?? "",
            status: status,
            dueDate: dueDate ? new Date(dueDate) : null,
            userId,
        });

        reply.status(200).send(task);
    }

    async get(
        request: FastifyRequest<{
            Querystring: { status?: "pending" | "completed" };
        }>,
        reply: FastifyReply
    ) {
        const { status } = request.query;
        const taskService = new TaskService();
        const result = await taskService.get(status);
        return reply.send(result);
    }

    async getById(
        request: FastifyRequest<{ Params: GetByIdParams }>,
        reply: FastifyReply
    ) {
        const { id } = request.params;

        const taskService = new TaskService();
        const task = await taskService.getById(id);

        if (!task) {
            return reply.status(404).send({ error: "Task não encontrada" });
        }

        return reply.status(200).send(task);
    }

    async delete(
        request: FastifyRequest<{ Params: TaskIdParams }>,
        reply: FastifyReply
    ) {
        const { id } = request.params;

        const taskService = new TaskService();
        const res = await taskService.deleteById(id);

        if (!res.success) {
            if (res.reason === "NOT_FOUND") {
                return reply.status(404).send({ error: "Task não encontrada" });
            }

            return reply.status(500).send({ error: "Erro ao deletar task" });
        }

        return reply.status(200).send({
            status: "success",
            message: "Remoção da task feita com sucesso",
        });
    }

    async update(
        request: FastifyRequest<{
            Params: { id: string };
            Body: Partial<
                Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">
            >;
        }>,
        reply: FastifyReply
    ) {
        const id = Number(request.params.id);
        const taskData = request.body;

        const taskService = new TaskService();
        const res = await taskService.updateById(id, taskData);

        if (!res.success) {
            if (res.reason === "NOT_FOUND") {
                return reply.status(404).send({ error: "NOT_FOUND" });
            }
            return reply.status(500).send({ error: "Erro ao atualizar task" });
        }

        return reply.send({ message: "Task atualizada com sucesso" });
    }

    async setCompleted(
        request: FastifyRequest<{ Params: { id: number } }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;

            const taskService = new TaskService();

            const task = await taskService.getById(id);

            if (!task) {
                reply.status(404).send({ success: false, error: "NOT_FOUND" });
            }

            const taskUpdate = await taskService.setCompleted(id);

            if (!taskUpdate) {
                reply.status(500).send({
                    success: false,
                    error: "DATABASE_ERROR",
                    message: "Nenhuma task associada com o id fornecido",
                });
            }

            reply.status(200).send({
                success: true,
                message: "Tarefa completada com sucesso",
            });
        } catch (error) {
            reply.status(500).send({ succes: false, error });
        }
    }
}

export { TaskController };
