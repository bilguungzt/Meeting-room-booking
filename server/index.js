import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import studentRoutes from "./routes/student.js";
import roomsRoutes from "./routes/rooms.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());

app.use("/students", studentRoutes);
app.use("/roomss", roomsRoutes);

const CONNECTION_URL =
  "mongodb://scheduler:scheduler123@scheduler-shard-00-00.kj21q.mongodb.net:27017,scheduler-shard-00-01.kj21q.mongodb.net:27017,scheduler-shard-00-02.kj21q.mongodb.net:27017/scheduler?ssl=true&replicaSet=atlas-fwehe4-shard-0&authSource=admin&retryWrites=true&w=majority;";

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    console.log(`Connection sucessful and port is ${PORT}`);
  })
  .catch((error) => console.log(error.message));

app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}`);
});
