import { db } from "../database/db";

export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    salt: string;
}

export type User = Omit<UserAttributes, "id | updatedAt | createdAt">;

export class UserModel {
    static async create(user: User): Promise<User> {
        const [data] = await db.query(
            "INSERT INTO users (name, email, password, salt) VALUES (?,?,?, ?)",
            [user.name, user.email, user.password, user.salt]
        );

        const insertRes = data as any;
        const insertedId = insertRes.insertId;

        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [
            insertedId,
        ]);
        const resultRows = rows as UserAttributes[];
        return resultRows[0];
    }

    static async getUserByEmail(email: string): Promise<UserAttributes> {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);

        const taskResult = rows as UserAttributes[];
        return taskResult[0];
    }
}
