const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log(process.env.DB_URL);
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(
        `Database is connected successfully: ${data.connection.host}`
      );
    })
    .catch((er) => console.log("Database connection failed..", er.message));
};

module.exports = connectDatabase;