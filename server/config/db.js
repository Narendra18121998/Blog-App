import mongoose from "mongoose";

const connectToMongo = async()=>{
const username = process.env.Db_Username
const password = process.env.Db_Password
const url = `mongodb+srv://${username}:${password}@cluster0.z6b3rvx.mongodb.net/blog-project?retryWrites=true&w=majority&appName=Cluster0`
    try {
        await mongoose.connect(url)
        console.log("connection successful to db")
    } 
    catch (error) {
        console.error("database connection failed") 
    }
}

export default connectToMongo;
