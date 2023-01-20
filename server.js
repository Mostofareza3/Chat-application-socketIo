const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

//register routes
app.use("/api/auth", authRoutes);

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
      console.log("Database connected successfully");
    });
  })
  .catch((err) => {
    console.log("Database connection failure!");
    console.log(err);
  });
