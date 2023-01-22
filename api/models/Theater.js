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
            required: true,
        },
        city:{
            type:String,
            required:true,
        },
        location:{
            type:String,
            required:true,
        },
        seats: {
            type: [String],
        },
        
});

export default mongoose.model("Theater", TheaterSchema);