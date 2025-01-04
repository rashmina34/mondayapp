const ColumnChange = require("../models/Items");

async function upsertWebHookInfo(data, fromCalculation = false) {
    try {
        console.log("I'm here")
        // Extract column details
        const columnEntry = {
            columnId: data.columnId,
            columnValue: data.value?.value || data.value, // Value from webhook
        };

        let columnsToAdd = [columnEntry]; // Start with the provided column
        if (fromCalculation) {
            const defaultColumnEntry = {
                columnId: process.env.RESULT_COLUMN_ID,
                columnValue: `${data.value?.value * 5}`,
            };
            columnsToAdd.push(defaultColumnEntry); // Add default column if fromCalculation is true
        }

        console.log(columnsToAdd, '<<<<<columnsToAdd');
        const existingDocument = await ColumnChange.findOne({
            pulseId: data.pulseId,
            boardId: data.boardId,
            // "columns.columnId": data.columnId,
        });

        if (existingDocument) {
            // Update the columns array by replacing matching columnId and adding new ones
            let updatedColumns = existingDocument.columns || [];

            // Filter out existing entries with the same columnId
            updatedColumns = updatedColumns.filter(
                (col) => !columnsToAdd.some((newCol) => newCol.columnId === col.columnId)
            );

            // Append new/updated columns
            updatedColumns.push(...columnsToAdd);

            // Update the document with the modified columns array
            const result = await ColumnChange.findOneAndUpdate(
                {
                    pulseId: data.pulseId,
                    boardId: data.boardId,
                },
                { $set: { columns: updatedColumns } },
                { new: true }
            );

            console.log("Columns updated:", result);
            return result;
        } else {
            // Add a new column entry if it doesn't exist
            const result = await ColumnChange.findOneAndUpdate(
                {
                    pulseId: data.pulseId,
                    boardId: data.boardId,
                },
                {
                    $set: data,
                    $addToSet: { columns: { $each: columnsToAdd } }, // Add unique column entry
                },
                { upsert: true, new: true } // Upsert and return updated document
            );
            return result;
        }

    } catch (err) {
        console.error('Error inserting or updating data:', err);
        throw err;
    }
}

module.exports = {
    upsertWebHookInfo,
};