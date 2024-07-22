const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://codechamp97:ZE9Dyhhtdx8lWLd7@dev.wr5w18r.mongodb.net/one_green_diary");
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
