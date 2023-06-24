import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

export default ConnectDB;
