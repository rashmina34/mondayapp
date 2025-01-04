const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const mongooseConnection = require("./configs/mongoose");
const webhookRouter = require("./routes/webhook");

const app = express();

// Middleware
app.use(bodyParser.json());

// Initialize MongoDB connection
mongooseConnection();

app.get("/", async (req, res) => {
    return res.json({ message: "successful" })
})

// Routes
app.use("/multiply", webhookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});