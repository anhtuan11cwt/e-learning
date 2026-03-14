import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB);
    console.log(`Cơ sở dữ liệu đã kết nối: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Lỗi: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
