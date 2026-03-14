import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    category: {
      required: true,
      type: String,
    },
    createdBy: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    duration: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    title: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

const Course = mongoose.model("Courses", courseSchema);

export default Course;
