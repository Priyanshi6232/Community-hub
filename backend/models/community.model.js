// models/Community.js
import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Assuming users are stored in a User model
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Initial member would be the creator
    createdAt: { type: Date, default: Date.now }
});
   
export default mongoose.model('Community', communitySchema);
