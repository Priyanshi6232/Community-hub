import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: String,
    institute: String,
    fee: Number,
    impressions: Number,
    daysLeft: Number,
    category: [String],
    location: String,
    updatedOn: Date,
    participationType: String,
    isOnline: Boolean,
    description: String
});

// Use the ES6 export syntax
const Event = mongoose.model('Event', eventSchema);
export default Event; // Export as default
