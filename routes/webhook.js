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
    console.log(event, '<<<event');

    // Extract values from the event object
    const boardId = String(event.boardId);
    const itemId = String(event.pulseId);
    let result;

    if (event.columnTitle === 'Numbers') {
        const numberColumnValue = event.value?.value;
        if (typeof numberColumnValue === "undefined") {
            return res.status(400).send({ error: "Number column value is missing." });
        }

        result = numberColumnValue * 5;
    }

    try {
        if (event.columnTitle === 'Numbers') {
            const query = ` mutation UpdateColumnValue($itemId: ID!, $boardId: ID!, $columnId: String!, $value: String!) {
            change_simple_column_value(
              item_id: $itemId,
              board_id: $boardId,
              column_id: $columnId,
              value: $value
            ) {
              id
            }
          }`

            const variables = {
                itemId: itemId,
                boardId: boardId,
                "columnId": "numbers_1_mkktdq6j",
                "value": `${result}`
            }

            await monday.api(query, { variables });
        }
        await upsertWebHookInfo(event, fromCalculation = event.columnTitle === 'Numbers' ? true : false);
        res.status(200).send({ message: "Column updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update column" });
    }
});

module.exports = router;
