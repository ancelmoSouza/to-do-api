import { User } from "../models/User";

interface TaskIdParams {
    id: number;
}

type TaskResponse =
    | { success: true }
    | { success: false; reason: "NOT_FOUND" | "DATABASE_ERROR"; error?: any };

type LoginResponse = User | { success: false; error: unknown } | undefined;

interface UserParams {
    email: string;
}

interface UserRequestBody {
    password: string;
    email: string;
}

interface VerifyPasswordInput {
    candidatePassword: string;
    salt: string;
    hash: string;
}

export {
    TaskIdParams,
    TaskResponse,
    VerifyPasswordInput,
    UserParams,
    UserRequestBody,
    LoginResponse,
};
