import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            content: String,
            timestamp: { type: Date, default: Date.now },
        },
    ],
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Community', communitySchema);
