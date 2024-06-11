import mongoose from "mongoose";

export const DB_Connection = async():Promise<void> => {
    try {
        const url = process.env.DB_URL

        if (!url) {
            throw new Error("Invalid URL: " + url);
        }
        await mongoose.connect(url);
        console.log("Connected to database");

    } catch (error) {
        throw new Error("Error connecting to database");
    }
};