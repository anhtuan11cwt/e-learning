import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    course: {
      ref: "Courses",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    description: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    video: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;
