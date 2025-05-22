import mongoose from 'mongoose';

export async function connectToDb() {
    try {
        
        await mongoose.connect('mongodb+srv://Dvora:Dvora9866@cluster0.6bv2uox.mongodb.net/ ');
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
connectToDb();

