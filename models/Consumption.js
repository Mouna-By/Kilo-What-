const mongoose = require("mongoose");

const consumptionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["electricity", "water", "gas"],
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Consumption", consumptionSchema);
