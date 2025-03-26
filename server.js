const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { loadData } = require("./helpers/loadData");

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

const dbUrl = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(dbUrl, {
    serverSelectionTimeoutMS: 5000,
    tlsAllowInvalidCertificates: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection succesfully");
    if (process.env.NODE_ENV !== "development") {
      loadData();
    }
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
