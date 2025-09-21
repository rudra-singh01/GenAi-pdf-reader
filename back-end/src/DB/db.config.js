import monbgoose from "mongoose";

const connectDB = async () => {
    try {
        await monbgoose.connect(process.env.MONGO_URI);
        console.log("db connected");
    } catch (error) {
        console.log("error in db connection",error);
    }
}

export default connectDB;