import mongoose from "mongoose";
const roomsSchema = mongoose.Schema(
  {
    text: String,
    id: Number,
    color: String,
    capacity: Number,
    type: String,
  }
  // subjects: [String],
);

const rooms = mongoose.model("rooms", roomsSchema);
export default rooms;
