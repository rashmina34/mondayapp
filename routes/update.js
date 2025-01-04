const express = require("express");
const mondaySdk = require("monday-sdk-js");
const { upsertWebHookInfo } = require('../modules/insertOrUpdateData');

const router = express.Router();

// Initialize the SDK
const monday = mondaySdk();
const token = process.env.MONDAY_API_TOKEN

monday.setToken(token);
// Endpoint to handle the action
router.post("/", async (req, res) => {

    const { challenge } = req.body;

    if (challenge) {
        // Respond to the challenge
        return res.status(200).send({ challenge });
    }

    const { event } = req.body;

    try {
        await upsertWebHookInfo(event);
        res.status(200).send({ message: "Column updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update column" });
    }
});

module.exports = router;
