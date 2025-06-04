import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../database/db";
import { TaskResponse } from "../types";

export type StatusType = "pending" | "completed";

export interface TaskAttributes {
    id: number;
    title: string;
    description?: string;
    status: StatusType;
    dueDate?: Date | null;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

interface TaskList extends RowDataPacket {
    id: number;
    title: string;
    description?: string;
    status: StatusType;
    dueDate?: Date | null;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type Task = Omit<
    TaskAttributes,
    "id | description | dueDate | updatedAt | createdAt"
>;

export class TaskModel {
    static async create(task: Task): Promise<Task> {
        const [data] = await db.query(
            "INSERT INTO tasks (title, description,status,dueDate,userId) VALUES (?, ?, ?, ?, ?)",
            [
                task.title,
                task.description || "",
                task.status,
                task.dueDate || null,
                task.userId,
            ]
        );

        const insertRes = data as any;
        const insertedId = insertRes.insertId;

        const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [
            insertedId,
        ]);
        const resultRows = rows as TaskAttributes[];
        return resultRows[0];
    }

    static async getAll(
        status?: "pending" | "completed" | undefined
    ): Promise<TaskList[]> {
        let query = "SELECT * FROM tasks";
        const values: any[] = [];

        if (status) {
            query += " WHERE status = ?";
            values.push(status);
        }

        const [rows] = await db.query<TaskList[]>(query, values);
        return rows;
    }

    static async getById(id: number): Promise<TaskAttributes> {
        const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);

        const taskResult = rows as TaskAttributes[];
        return taskResult[0];
    }

    static async deleteById(id: number): Promise<TaskResponse> {
        try {
            const [rows] = await db.query("DELETE FROM tasks WHERE id = ?", [
                id,
            ]);

            if ((rows as any).affectedRows === 0) {
                return { success: false, reason: "NOT_FOUND" };
            }

            return { success: true };
        } catch (error) {
            return { success: false, reason: "DATABASE_ERROR", error };
        }
    }

    static async updateById(
        id: number,
        updates: Partial<Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">>
    ): Promise<TaskResponse> {
        try {
            const keys = Object.keys(updates).filter(
                (key) => (updates as any)[key] !== undefined
            );
            if (keys.length === 0) {
                return { success: true };
            }

            const values = keys.map((key) => (updates as any)[key]);
            const setClause = keys.map((key) => `${key} = ?`).join(", ");

            const [result] = await db.query(
                `UPDATE tasks SET ${setClause}, updatedAt = NOW() WHERE id = ?`,
                [...values, id]
            );

            if ((result as any).affectedRows === 0) {
                return { success: false, reason: "NOT_FOUND" };
            }

            return { success: true };
        } catch (error) {
            return { success: false, reason: "DATABASE_ERROR", error };
        }
    }

    static async updateStatus(
        id: number,
        newStatus: "completed"
    ): Promise<boolean> {
        const [rows] = await db.query<ResultSetHeader>(
            `UPDATE tasks SET status="${newStatus}", updatedAt = NOW() WHERE id = ?`,
            [id]
        );

        if (rows.affectedRows === 0) {
            return false;
        }
        return true;
    }
}
