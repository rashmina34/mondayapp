const mongoose = require("mongoose");
const config = require("./database");

const connectToMongoDB = () => {
    mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
        console.log("Connected to MongoDB");
    });
};

module.exports = connectToMongoDB;
