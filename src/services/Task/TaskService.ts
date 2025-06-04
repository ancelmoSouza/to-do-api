import {
    StatusType,
    Task,
    TaskAttributes,
    TaskModel,
} from "../../models/TaskModel";
import { TaskResponse } from "../../types";

interface TaskInput {
    title: string;
    description?: string;
    status: StatusType;
    dueDate?: Date | null;
    userId: number;
}

class TaskService {
    async create(data: TaskInput) {
        if (
            !data.title ||
            !data.status ||
            (data.status != "pending" && data.status != "completed") ||
            !data.userId
        ) {
            throw new Error("Invalid Request");
        }

        const taskData = await TaskModel.create({
            title: data.title,
            description: data.description || "",
            status: data.status,
            dueDate: data.dueDate || "",
            userId: data.userId,
        } as Task);

        return taskData;
    }

    async get(status: "pending" | "completed" | undefined) {
        const tasksList = await TaskModel.getAll(status);

        return tasksList;
    }

    async getById(id: number) {
        const task = await TaskModel.getById(id);
        return task;
    }

    async deleteById(id: number): Promise<TaskResponse> {
        const res = await TaskModel.deleteById(id);

        return res;
    }

    async updateById(
        id: number,
        updates: Partial<Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">>
    ): Promise<TaskResponse> {
        const res = await TaskModel.updateById(id, updates);

        return res;
    }

    async setCompleted(id: number): Promise<boolean> {
        const taskCompleted = await TaskModel.updateStatus(id, "completed");

        return taskCompleted;
    }
}

export { TaskService };
