import { app } from "./api/server";
import dotenv from "dotenv";

dotenv.config();

const start = async () => {
    try {
        const port = parseInt(process.env.PORT || "8000");
        await app.listen({ port: port });
        console.log(`server started on port ${port}...`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
