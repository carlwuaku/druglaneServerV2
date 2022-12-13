import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Log text required']
    },
    priority: {
        type: String,
        default: 'log',
        enum: ['low', 'moderate', 'high']
    },
    user: {
        type: String,
        trim: true,
        required: [true, 'User is required']
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Log', LogSchema)