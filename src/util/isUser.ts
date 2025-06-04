import { User } from "../models/User";

function isUser(obj: any): obj is User {
    return obj && typeof obj === "object" && "id" in obj && "email" in obj;
}

export { isUser };
