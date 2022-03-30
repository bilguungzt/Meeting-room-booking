import mongoose from "mongoose";
const studentSchema = mongoose.Schema(
  {
    Id: Number,
    Subject: String,
    Description: String,
    StartTime: String,
    EndTime: String,
    RoomId: Number,
  }
  // subjects: [String],
);

const student = mongoose.model("student", studentSchema);
export default student;
