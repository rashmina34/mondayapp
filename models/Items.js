const mongoose = require("mongoose");

const items = new mongoose.Schema({
    boardId: String,
    pulseId: String,
    userId: String,
    type: String,
    triggerTime: Date,
    subscriptionId: String,
    groupId: String,
    pulseName: String,
    value: mongoose.Schema.Types.Mixed,
    previousValue: mongoose.Schema.Types.Mixed,
    changedAt: { type: Date, default: Date.now },
    isTopGroup: Boolean,
    triggerUuid: String,
    columns: [
        {
            columnId: { type: String, required: true }, // Column ID from webhook
            columnValue: mongoose.Schema.Types.Mixed,  // Value can be a number, string, or object
        },
    ],
});

module.exports = mongoose.model("Items", items);
