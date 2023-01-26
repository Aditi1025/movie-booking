import mongoose from "mongoose";
const TheaterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        country: {
            type: String,
        },
        city:{
            type:String,
            required:true,
        },
        location:{
            type:String,
            required:true,
        },
        shows: {
            type: [String],
        },
        
});

export default mongoose.model("Theater", TheaterSchema);