import { logger } from "@/server/config/logger";
import mongoose from "mongoose";

export const connectDB =async () => {
    try {
        const connection = await mongoose
            .connect(`mongodb+srv://carl:pass1234@cluster0.ai5biiv.mongodb.net/?retryWrites=true&w=majority`);
        logger.info('mongo db ocnnected')
    } catch (error) {
        logger.error(error)
    }
}