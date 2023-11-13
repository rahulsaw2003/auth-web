import mongoose from 'mongoose';

export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "users"
        });
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.log("Error in MongoDB connection: ", error)
    }
}