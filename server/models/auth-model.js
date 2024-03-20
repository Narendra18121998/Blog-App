import mongoose from "mongoose";
const authShema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }

})

const authmodel = mongoose.model("users" , authShema)
export default authmodel;
