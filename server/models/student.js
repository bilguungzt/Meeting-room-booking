import mongoose from "mongoose";
const studentSchema = mongoose.Schema(
  {
    Id: Number,
    Subject: String,
    Description: String,
    StartTime: String,
    EndTime: String,
    RoomId: Number,
    isReadonly: Boolean,
  }
  // subjects: [String],
);

const student = mongoose.model("meeting", studentSchema);
export default student;
