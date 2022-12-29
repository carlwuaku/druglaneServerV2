import { logger } from "./logger";
import mongoose from "mongoose";

export const connectDB =async () => {
    try {
        const connection = await mongoose
            .connect(`mongodb+srv://carl:pass1234@cluster0.ai5biiv.mongodb.net/?retryWrites=true&w=majority`);
        logger.info('mongo db connected')
    } catch (error) {
        logger.error(error)
    }
}