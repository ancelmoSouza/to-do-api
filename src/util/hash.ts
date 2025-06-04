import crypto from "crypto";
import { VerifyPasswordInput } from "../types";

export function hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString("hex");

    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString();

    return { hash, salt };
}

export function verifyPassword({
    candidatePassword,
    salt,
    hash,
}: VerifyPasswordInput) {
    const candidateHash = crypto
        .pbkdf2Sync(candidatePassword, salt, 1000, 64, "sha512")
        .toString();

    return candidateHash === hash;
}
