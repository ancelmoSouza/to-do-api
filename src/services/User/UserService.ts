import { User, UserModel } from "../../models/User";
import { LoginResponse, UserRequestBody } from "../../types";
import { hashPassword } from "../../util/hash";

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

class UserService {
    async create({ name, email, password }: CreateUserInput) {
        if (!email || !password) {
            throw new Error("Invalid Request");
        }

        const { hash, salt } = hashPassword(password);

        const data = await UserModel.create({
            name: name,
            password: hash,
            email: email,
            salt: salt,
        } as User);

        return data;
    }

    async login({ email }: UserRequestBody): Promise<LoginResponse> {
        try {
            const user = await UserModel.getUserByEmail(email);

            return user;
        } catch (error) {
            return { success: false, error };
        }
    }
}

export { UserService };
